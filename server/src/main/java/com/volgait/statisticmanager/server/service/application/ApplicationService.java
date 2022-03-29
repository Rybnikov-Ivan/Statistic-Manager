package com.volgait.statisticmanager.server.service.application;

import com.volgait.statisticmanager.server.model.entity.Application;
import com.volgait.statisticmanager.server.model.form.ApplicationForm;
import com.volgait.statisticmanager.server.service.response.ServiceResponse;

import java.util.List;

public interface ApplicationService {
    ServiceResponse create(String username, ApplicationForm applicationForm);
    List<Application> getAll();
}
