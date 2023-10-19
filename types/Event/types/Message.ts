/**
 * 	
An object describing the user on whose behalf the current transaction was initiated.
 */
export interface EventMessage {
  /**
   * Action enrollment or second-factor-authentication
   */
  action: "enrollment" | "second-factor-authentication" | string;
  /**
   * One-time password that the user needs to use to enter in the form.
   */
  code: string;
  /**
   * Type of message sms/voice
   */
  message_type: "sms" | "voice" | string;
  /**
   * Phone number where the message will be sent.
   */
  recipient: string;
  /**
   * Content of the message to be sent.
   */
  text: string;
}
