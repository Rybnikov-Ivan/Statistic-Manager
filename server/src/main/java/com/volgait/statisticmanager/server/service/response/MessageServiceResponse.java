package com.volgait.statisticmanager.server.service.response;

public enum MessageServiceResponse {
    NO_USER_WITH_USERNAME("No such user in system."),
    USER_EMAIL_ALREADY_EXIST("Email already registered."),
    USER_USERNAME_ALREADY_EXIST("Username already exists."),
    NEW_PASSWORD_MISMATCHED("Password mismatched"),
    APPLICATION_NAME_ALREADY_EXIST("Name already exists"),
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
