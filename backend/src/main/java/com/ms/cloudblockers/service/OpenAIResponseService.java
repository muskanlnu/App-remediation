package com.ms.cloudblockers.service;

import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.azure.ai.openai.OpenAIClient;
import com.azure.ai.openai.OpenAIClientBuilder;
import com.azure.ai.openai.models.ChatCompletions;
import com.azure.ai.openai.models.ChatCompletionsOptions;
import com.azure.ai.openai.models.ChatMessage;
import com.azure.ai.openai.models.ChatRole;
import com.azure.core.credential.AzureKeyCredential;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ms.cloudblockers.bean.ClassResponse;

@Service
public class OpenAIResponseService {
    @Value("${openai.api.model}")
    private String modelName;
    @Value("${openai.api.url}")
    private String openAIUrl;
    @Value("${openai.api.key}")
    private String openAIKey;

    Logger logger = LoggerFactory.getLogger(OpenAIResponseService.class);

    /*
     * This method calls Open AI service to generate text based on input prompt
     * 
     * @param systemPrompt
     * 
     * @param inputPrompt
     * 
     * @return String
     * 
     * @throws Exception
     */
    public String generateText(String systemPrompt, String inputPrompt) {
        logger.info("System Prompt: " + systemPrompt);
        logger.info("Input Prompt: " + inputPrompt);
        try {
            // Create a client that authorizes with the API key and endpoint
            OpenAIClient client = new OpenAIClientBuilder()
                    .credential(new AzureKeyCredential(openAIKey))
                    .endpoint(openAIUrl)
                    .buildClient();
            logger.info("Client Built");
            // Create a list of chat messages
            List<ChatMessage> chatMessages = new ArrayList<>();
            // Add the system prompt and user input prompt to the list of chat messages
            chatMessages.add(new ChatMessage(ChatRole.SYSTEM, systemPrompt));
            chatMessages.add(new ChatMessage(ChatRole.USER, inputPrompt));
            logger.info("Calling Open AI service to generate text based on input prompt");
            // Call the chat endpoint
            ChatCompletions chatCompletions = client.getChatCompletions(
                    modelName,
                    new ChatCompletionsOptions(chatMessages).setTemperature(.1));
            logger.info("Response received at: " + chatCompletions.getCreatedAt());
            // Get the first choice from the list of choices
            String resp = chatCompletions.getChoices().get(0).getMessage().getContent();
            logger.info("Response: " + resp);
            return resp;
        } catch (Exception e) {
            // Log error if any exception occurs
            logger.error("Error Occured while calling Open AI Service", e);
        }
        return null;
    }

    public ClassResponse jsonToPojo(String json) {
        logger.info("Converting JSON to POJO: " + json);
        String formattedJson = json.substring(json.indexOf('{'), json.lastIndexOf('}') + 1);
        logger.info("Formatted JSON: " + formattedJson);
        ObjectMapper objectMapper = new ObjectMapper();
        ClassResponse respClass = null;
        try {
            respClass = objectMapper.readValue(formattedJson, ClassResponse.class);
        } catch (Exception e) {
            logger.error("Error while converting JSON to POJO: ", e);
        }
        return respClass;
    }

}
