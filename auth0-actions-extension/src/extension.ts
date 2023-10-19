import { JsonWebKey } from 'crypto';
import { url } from 'inspector';
import * as vscode from 'vscode';
const axios = require('axios');
import * as fs from 'fs';
import * as path from 'path';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "auth0-actions" is now active!');
	checkTenantInfo(context);

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('auth0-actions.connectTenant', async () => {
		connectTenant(context);
	});
	vscode.commands.registerCommand('auth0-actions.refresh', async () => {
		let token = await getBearerToken(context);
		let url :string= context.globalState.get('auth0_url') as string;
		getActions(url, token);
	})
	vscode.commands.registerCommand('auth0-actions.edit', (element) => {
		let code = element.children[4].label;
		let name = element.label;
		const editor = vscode.window.activeTextEditor;
		if (editor) {
			editor.edit(builder => {
				const doc = vscode.window.activeTextEditor!.document;
				if(doc){
					builder.replace(new vscode.Range(doc.lineAt(0).range.start, doc.lineAt(doc.lineCount - 1).range.end), code);
				}else {
					builder.replace(editor.selection.active, code);
				}
			});
		}
		// var setting: vscode.Uri = vscode.Uri.parse(name + ".js");
		// vscode.workspace.openTextDocument(setting).then((a: vscode.TextDocument) => {
		// 	vscode.window.showTextDocument(a, 1, false).then(e => {
		// 		e.edit(edit => {
		// 			edit.insert(new vscode.Position(0, 0), code);
		// 		});
		// 	});
		// }, (error: any) => {
		// 	console.error(error);
		// 	debugger;
		// });
	})

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}

async function connectTenant(context){
// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		
		//TODO: empty storage for now. needs to be removed
		//deleteStorage(context);

		let clientId :string = context.globalState.get('auth0_clientId') as string;
		let clientSecret :string = context.globalState.get('auth0_clientSecret') as string;
		let url :string= context.globalState.get('auth0_url') as string;

		if(!clientId || !clientSecret || !url){
			clientId = await vscode.window.showInputBox({
				placeHolder: 'your client_id',
				prompt: 'your client_id for the management api',
				ignoreFocusOut: true,
			}) as string;
			clientSecret = await vscode.window.showInputBox({
				placeHolder: 'your client_secret',
				prompt: 'your client_secret for the management api',
				ignoreFocusOut: true,
			}) as string;
			url = await vscode.window.showInputBox({
				placeHolder: 'your auth0 url',
				prompt: 'your Auth0 URL for the management api (e.g. https://tenant.eu.auth0.com',
				ignoreFocusOut: true,
			}) as string;
			context.globalState.update('auth0_clientId', clientId);
			context.globalState.update('auth0_clientSecret', clientSecret);
			context.globalState.update('auth0_url', url);
		}
		vscode.window.registerTreeDataProvider('auth0-tenants', new TreeDataProviderTenants(url,clientId));
}

class TreeDataProviderTenants implements vscode.TreeDataProvider<TreeItemTenant> {
	onDidChangeTreeData?: vscode.Event<TreeItemTenant|null|undefined>|undefined;
  
	data: TreeItemTenant[];
  
	constructor(url:string,clientId:string) {
	  this.data = [new TreeItemTenant(url, 
		//[new TreeItemTenant(clientId)]
	  )];
	}
  
	getTreeItem(element: TreeItemTenant): vscode.TreeItem|Thenable<vscode.TreeItem> {
	  return element;
	}
  
	getChildren(element?: TreeItemTenant|undefined): vscode.ProviderResult<TreeItemTenant[]> {
	  if (element === undefined) {
		return this.data;
	  }
	  return element.children;
	}
}
  
  class TreeItemAction extends vscode.TreeItem {
	children: TreeItemAction[]|undefined;
	constructor(
		label: string, 
		children?: TreeItemAction[],
		public readonly collapsibleState: vscode.TreeItemCollapsibleState = vscode.TreeItemCollapsibleState.Collapsed,	
        public readonly iconPath = {
            dark: path.join(__filename, '..', '..', 'resources', 'actions-logo-dark.svg'),
			light: path.join(__filename, '..', '..', 'resources', 'actions-logo-light.svg')
        }
		) {
	  super(
		  label,
		  children === undefined ? vscode.TreeItemCollapsibleState.None :
								   vscode.TreeItemCollapsibleState.Expanded);
	  this.children = children;
	}
}
class TreeItemTenant extends vscode.TreeItem {
	children: TreeItemTenant[]|undefined;
	constructor(
		label: string, 
		children?: TreeItemTenant[],
        public readonly iconPath = {
            dark: path.join(__filename, '..', '..', 'resources', 'auth0-logo.svg'),
			light: path.join(__filename, '..', '..', 'resources', 'auth0-logo.svg')
        }
		) {
	  super(
		  label,
		  children === undefined ? vscode.TreeItemCollapsibleState.None :
								   vscode.TreeItemCollapsibleState.Collapsed);
	  this.children = children;
	}
}

  class TreeDataProviderActions implements vscode.TreeDataProvider<TreeItemAction> {
	onDidChangeTreeData?: vscode.Event<TreeItemAction|null|undefined>|undefined;
  
	data: TreeItemAction[];
	constructor(actions) {
		let tree = new Array(actions.length);
		actions = JSON.parse(actions);
		actions = actions.actions;
		for (let i=0; i<actions.length; i++){
			tree.push(new TreeItemAction(actions[i].name, [
				new TreeItemAction('trigger: ' + actions[i].supported_triggers[0].id),
				new TreeItemAction('runtime: ' + actions[i].runtime),
				new TreeItemAction('status: ' + actions[i].status),
				new TreeItemAction('id: ' + actions[i].id), 
				new TreeItemAction(actions[i].code)
			]))
		}
		this.data = tree;
	}
  
	getTreeItem(element: TreeItemAction): vscode.TreeItem|Thenable<vscode.TreeItem> {
	  return element;
	}
  
	getChildren(element?: TreeItemAction|undefined): vscode.ProviderResult<TreeItemAction[]> {
	  if (element === undefined) {
		return this.data;
	  }
	  return element.children;
	}
}

function deleteStorage(context: vscode.ExtensionContext) {
	context.globalState.update('auth0_clientId', undefined);
	context.globalState.update('auth0_clientSecret', undefined);
	context.globalState.update('auth0_url', undefined);
}

function getActions(url: string, bearer:string){
	let config = {
	method: 'get',
	maxBodyLength: Infinity,
	url: url+'/api/v2/actions/actions',
	headers: { 
		'Accept': 'application/json', 
		'Authorization': 'Bearer '+bearer
	}
	};

	axios.request(config)
	.then((response) => {
		vscode.window.registerTreeDataProvider('auth0-actions', new TreeDataProviderActions(JSON.stringify(response.data)));
		return response;
	})
	.catch((error) => {
		console.log(error);
		return error;
	});
}
async function getBearerToken(context) {
	let clientId :string = context.globalState.get('auth0_clientId') as string;
	let clientSecret :string = context.globalState.get('auth0_clientSecret') as string;
	let url :string= context.globalState.get('auth0_url') as string;
	var options = {
		method: 'POST',
		url: url+'/oauth/token',
		headers: {'content-type': 'application/x-www-form-urlencoded'},
		data: new URLSearchParams({
		  grant_type: 'client_credentials',
		  client_id: clientId,
		  client_secret: clientSecret,
		  audience: url+'/api/v2/'
		})
	  };
	  const result = await axios.request(options).then(function (response) {
		return response.data.access_token;
	  }).catch(function (error) {
		return error;
	  });
	  return result as string;
}

function checkTenantInfo(context) {
	let clientId :string = context.globalState.get('auth0_clientId') as string;
	let clientSecret :string = context.globalState.get('auth0_clientSecret') as string;
	let url :string= context.globalState.get('auth0_url') as string;

	if(clientId || clientSecret || url){
		vscode.window.registerTreeDataProvider('auth0-tenants', new TreeDataProviderTenants(url,clientId));
	}
}

