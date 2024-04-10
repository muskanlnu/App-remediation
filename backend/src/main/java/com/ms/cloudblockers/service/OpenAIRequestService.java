package com.ms.cloudblockers.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;


@Service
public class OpenAIRequestService {

    @Value("${cloudblocker.system.prompt}")
    private String systemPrompt;

    @Value("${cloudblocker.user.prompt}")
    private String userPrompt;
    

    public String generateUserPrompt(String fileContent) {
        StringBuilder inputPrompt = new StringBuilder();
        inputPrompt.append(userPrompt).append("\n");
        inputPrompt.append(fileContent).append("\n");
        return inputPrompt.toString();
    }

    public String generateSystemPrompt() {
        return systemPrompt;
    }

    public String replacePlaceHolders(String inputText){

        return null;
    }

}
