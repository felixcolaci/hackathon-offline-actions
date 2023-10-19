"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const vscode = require("vscode");
const axios = require('axios');
const path = require("path");
// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
function activate(context) {
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
        let url = context.globalState.get('auth0_url');
        getActions(url, token);
    });
    context.subscriptions.push(disposable);
}
exports.activate = activate;
// This method is called when your extension is deactivated
function deactivate() { }
exports.deactivate = deactivate;
async function connectTenant(context) {
    // The code you place here will be executed every time your command is executed
    // Display a message box to the user
    //TODO: empty storage for now. needs to be removed
    //deleteStorage(context);
    let clientId = context.globalState.get('auth0_clientId');
    let clientSecret = context.globalState.get('auth0_clientSecret');
    let url = context.globalState.get('auth0_url');
    if (!clientId || !clientSecret || !url) {
        clientId = await vscode.window.showInputBox({
            placeHolder: 'your client_id',
            prompt: 'your client_id for the management api',
            ignoreFocusOut: true,
        });
        clientSecret = await vscode.window.showInputBox({
            placeHolder: 'your client_secret',
            prompt: 'your client_secret for the management api',
            ignoreFocusOut: true,
        });
        url = await vscode.window.showInputBox({
            placeHolder: 'your auth0 url',
            prompt: 'your Auth0 URL for the management api (e.g. https://tenant.eu.auth0.com',
            ignoreFocusOut: true,
        });
        context.globalState.update('auth0_clientId', clientId);
        context.globalState.update('auth0_clientSecret', clientSecret);
        context.globalState.update('auth0_url', url);
    }
    vscode.window.registerTreeDataProvider('auth0-tenants', new TreeDataProviderTenants(url, clientId));
}
class TreeDataProviderTenants {
    constructor(url, clientId) {
        this.data = [new TreeItemTenant(url)];
    }
    getTreeItem(element) {
        return element;
    }
    getChildren(element) {
        if (element === undefined) {
            return this.data;
        }
        return element.children;
    }
}
class TreeItemAction extends vscode.TreeItem {
    constructor(label, children, collapsibleState = vscode.TreeItemCollapsibleState.Collapsed, iconPath = {
        dark: path.join(__filename, '..', '..', 'resources', 'actions-logo-dark.svg'),
        light: path.join(__filename, '..', '..', 'resources', 'actions-logo-light.svg')
    }) {
        super(label, children === undefined ? vscode.TreeItemCollapsibleState.None :
            vscode.TreeItemCollapsibleState.Expanded);
        this.collapsibleState = collapsibleState;
        this.iconPath = iconPath;
        this.children = children;
    }
}
class TreeItemTenant extends vscode.TreeItem {
    constructor(label, children, iconPath = {
        dark: path.join(__filename, '..', '..', 'resources', 'auth0-logo.svg'),
        light: path.join(__filename, '..', '..', 'resources', 'auth0-logo.svg')
    }) {
        super(label, children === undefined ? vscode.TreeItemCollapsibleState.None :
            vscode.TreeItemCollapsibleState.Collapsed);
        this.iconPath = iconPath;
        this.children = children;
    }
}
class TreeDataProviderActions {
    constructor(actions) {
        let tree = new Array(actions.length);
        actions = JSON.parse(actions);
        actions = actions.actions;
        for (let i = 0; i < actions.length; i++) {
            tree.push(new TreeItemAction(actions[i].name, [
                new TreeItemAction('trigger: ' + actions[i].supported_triggers[0].id),
                new TreeItemAction('runtime: ' + actions[i].runtime),
                new TreeItemAction('status: ' + actions[i].status),
                new TreeItemAction('id: ' + actions[i].id)
            ]));
        }
        this.data = tree;
    }
    getTreeItem(element) {
        return element;
    }
    getChildren(element) {
        if (element === undefined) {
            return this.data;
        }
        return element.children;
    }
}
function deleteStorage(context) {
    context.globalState.update('auth0_clientId', undefined);
    context.globalState.update('auth0_clientSecret', undefined);
    context.globalState.update('auth0_url', undefined);
}
function getActions(url, bearer) {
    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: url + '/api/v2/actions/actions',
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + bearer
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
    let clientId = context.globalState.get('auth0_clientId');
    let clientSecret = context.globalState.get('auth0_clientSecret');
    let url = context.globalState.get('auth0_url');
    var options = {
        method: 'POST',
        url: url + '/oauth/token',
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        data: new URLSearchParams({
            grant_type: 'client_credentials',
            client_id: clientId,
            client_secret: clientSecret,
            audience: url + '/api/v2/'
        })
    };
    const result = await axios.request(options).then(function (response) {
        return response.data.access_token;
    }).catch(function (error) {
        return error;
    });
    return result;
}
function checkTenantInfo(context) {
    let clientId = context.globalState.get('auth0_clientId');
    let clientSecret = context.globalState.get('auth0_clientSecret');
    let url = context.globalState.get('auth0_url');
    if (clientId || clientSecret || url) {
        vscode.window.registerTreeDataProvider('auth0-tenants', new TreeDataProviderTenants(url, clientId));
    }
}
//# sourceMappingURL=extension.js.map