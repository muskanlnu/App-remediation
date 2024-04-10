package com.ms.cloudblockers.bean;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class Method {

    @JsonProperty("methodName")
    private String methodName;

    @JsonProperty("isCloudBlocker")
    private String isCloudBlocker;

    @JsonProperty("whyCloudBlocker")
    private String whyCloudBlocker;

    @JsonProperty("suggestion")
    private String suggestion;

    public String getMethodName() {
        return methodName;
    }

    public void setMethodName(String methodName) {
        this.methodName = methodName;
    }

    public String getIsCloudBlocker() {
        return isCloudBlocker;
    }

    public void setIsCloudBlocker(String isCloudBlocker) {
        this.isCloudBlocker = isCloudBlocker;
    }

    public String getWhyCloudBlocker() {
        return whyCloudBlocker;
    }

    public void setWhyCloudBlocker(String whyCloudBlocker) {
        this.whyCloudBlocker = whyCloudBlocker;
    }

    public String getSuggestion() {
        return suggestion;
    }

    public void setSuggestion(String suggestedRemediationCode) {
        this.suggestion = suggestedRemediationCode;
    }

}
