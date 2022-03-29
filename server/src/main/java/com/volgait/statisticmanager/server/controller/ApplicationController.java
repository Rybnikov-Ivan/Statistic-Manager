package com.volgait.statisticmanager.server.controller;

import com.volgait.statisticmanager.server.model.form.ApplicationForm;
import com.volgait.statisticmanager.server.service.application.ApplicationService;
import com.volgait.statisticmanager.server.service.response.ServiceResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class ApplicationController {

    @Autowired
    ApplicationService applicationService;

    @PostMapping(value = "/{username}/designer")
    public ServiceResponse create(@PathVariable String username, ApplicationForm applicationForm) {
        return this.applicationService.create(username, applicationForm);
    }
}
