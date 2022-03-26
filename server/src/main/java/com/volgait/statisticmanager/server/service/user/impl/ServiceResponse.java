package com.volgait.statisticmanager.server.service.user.impl;

import lombok.Getter;
import lombok.Setter;
import org.springframework.http.HttpStatus;

@Getter
@Setter
public class ServiceResponse<T> {

    private HttpStatus responseCode;
    private MessageServiceResponse responseMessage;
    private T responseObject;

    public ServiceResponse() {}

    public ServiceResponse(HttpStatus code, MessageServiceResponse msg) {
        this.responseCode = code;
        this.responseMessage = msg;
    }

    public ServiceResponse(HttpStatus code, MessageServiceResponse msg, T responseObject) {
        this.responseCode = code;
        this.responseMessage = msg;
        this.responseObject = responseObject;
    }

    public void setSuccessResponse() {
        this.setResponseCode(HttpStatus.OK);
        this.setResponseMessage(MessageServiceResponse.OK);
    }

    public void setInternalServerErrorResponse() {
        this.setResponseCode(HttpStatus.INTERNAL_SERVER_ERROR);
        this.setResponseMessage(MessageServiceResponse.UKNOWN_PROBLEM);
    }
}
