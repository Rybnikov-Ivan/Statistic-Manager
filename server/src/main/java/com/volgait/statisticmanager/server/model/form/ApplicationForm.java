package com.volgait.statisticmanager.server.model.form;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ApplicationForm {
    String name;
    String date;

    public ApplicationForm() {}

    public ApplicationForm(String name, String date) {
        this.name = name;
        this.date = date;
    }
}
