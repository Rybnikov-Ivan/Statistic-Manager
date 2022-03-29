package com.volgait.statisticmanager.server.service.user;

import com.volgait.statisticmanager.server.model.entity.User;
import com.volgait.statisticmanager.server.model.form.RegistrationForm;
import com.volgait.statisticmanager.server.service.response.ServiceResponse;

public interface UserService {
    ServiceResponse login(User requestUser);
    ServiceResponse logout();
    ServiceResponse register(RegistrationForm form);
}
