package com.volgait.statisticmanager.server.service.application.impl;

import com.volgait.statisticmanager.server.model.entity.Application;
import com.volgait.statisticmanager.server.model.entity.User;
import com.volgait.statisticmanager.server.model.form.ApplicationForm;
import com.volgait.statisticmanager.server.repository.ApplicationRepository;
import com.volgait.statisticmanager.server.repository.UserRepository;
import com.volgait.statisticmanager.server.service.application.ApplicationService;
import com.volgait.statisticmanager.server.service.response.MessageServiceResponse;
import com.volgait.statisticmanager.server.service.response.ServiceResponse;
import com.volgait.statisticmanager.server.service.user.impl.UserServiceImpl;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.UnexpectedRollbackException;

import java.util.Date;
import java.util.List;

@Service
public class ApplicationServiceImpl implements ApplicationService {
    private static final Logger LOG = LoggerFactory.getLogger(UserServiceImpl.class);

    @Autowired
    UserRepository userRepository;

    @Autowired
    ApplicationRepository applicationRepository;

    @Override
    public ServiceResponse create(String username, ApplicationForm applicationForm) {
        ServiceResponse response = new ServiceResponse();
        User user = this.userRepository.findByUsername(username);

        if (userRepository.findByUsername(username) != null) {
            response.setResponseMessage(MessageServiceResponse.APPLICATION_NAME_ALREADY_EXIST);
            response.setResponseCode(HttpStatus.BAD_REQUEST);
            return response;
        }
        Application application = new Application();
        application.setName(applicationForm.getName());
        application.setCreationDate(new Date());
        application.setUser(user);

        try {
            applicationRepository.save(application);
            response.setSuccessResponse();
        } catch (UnexpectedRollbackException e) {
            e.printStackTrace();
            response.setInternalServerErrorResponse();
        } catch (Exception e) {
            response.setInternalServerErrorResponse();
        }
        return response;
    }

    @Override
    public List<Application> getAll() {
        return null;
    }
}
