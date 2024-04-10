package com.ms.cloudblockers.bean;

import java.util.List;

import org.springframework.data.annotation.Id;

import com.azure.spring.data.cosmos.core.mapping.Container;
import com.azure.spring.data.cosmos.core.mapping.GeneratedValue;
import com.fasterxml.jackson.annotation.JsonProperty;

@Container(containerName = "items")
public class Result {

    @Id
    @GeneratedValue
    @JsonProperty("id")
    private String id;

    @JsonProperty("filePath")
    private String filePath;

    @JsonProperty("responses")
    private List<ClassResponse> responses;

    @JsonProperty("timestamp")
    private String timestamp;

    
    public Result(String filePath, List<ClassResponse> responses, String timestamp) {
        this.filePath = filePath;
        this.responses = responses;
        this.timestamp = timestamp; 
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getFilePath() {
        return filePath;
    }

    public void setFilePath(String filePath) {
        this.filePath = filePath;
    }

    public List<ClassResponse> getResponses() {
        return responses;
    }

    public void setResponses(List<ClassResponse> responses){
        this.responses = responses;
    }

    public String getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(String timestamp) {
        this.timestamp = timestamp;
    }
    
}
