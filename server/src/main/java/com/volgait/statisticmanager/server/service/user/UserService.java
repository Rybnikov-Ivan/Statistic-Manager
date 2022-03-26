package com.volgait.statisticmanager.server.service.user;

import com.volgait.statisticmanager.server.model.entity.User;
import com.volgait.statisticmanager.server.model.form.RegistrationForm;
import com.volgait.statisticmanager.server.service.user.impl.ServiceResponse;

import javax.servlet.http.HttpServletRequest;

public interface UserService {
    ServiceResponse login(User requestUser);
    ServiceResponse logout();
    ServiceResponse register(RegistrationForm form);
    boolean activateAccount(String token);

    static String generateServerBaseUrl(HttpServletRequest request) {
        int port = request.getServerPort();
        StringBuilder baseUrl = new StringBuilder();
        baseUrl.append(request.getScheme())
                .append("://")
                .append(request.getServerName());
        if((request.getScheme().equals("http") && port != 80) || (request.getScheme().equals("https") && port != 443)) {
            baseUrl.append(":")
                    .append(port);
        }
        return baseUrl.toString();
    }
}
