package com.volgait.statisticmanager.server.service.user.impl;

public enum MessageServiceResponse {
    NO_USER_WITH_USERNAME("No such user in system."),
    USER_EMAIL_ALREADY_EXIST("Email already registered."),
    USER_USERNAME_ALREADY_EXIST("Username already exists."),
    NEW_PASSWORD_IS_THE_SAME("New password is the same as old one"),
    NEW_PASSWORD_MISMATCHED("Password mismatched"),
    FORBIDDEN_ACTION("The action is forbidden for current user"),
    EMAIL_SENDING_PROBLEM("Sending email failed."),
    UKNOWN_PROBLEM("Uknown problem"),
    OK("Well done"),
    ERROR("Error");

    private final String message;
    MessageServiceResponse(final String message) {
        this.message = message;
    }
    @Override
    public String toString() {
        return message;
    }
}
