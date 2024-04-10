package com.ms.cloudblockers.processor;

import java.nio.file.Path;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.CompletableFuture;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ms.cloudblockers.bean.ClassResponse;
import com.ms.cloudblockers.service.FileReaderService;
import com.ms.cloudblockers.service.FileScannerService;
import com.ms.cloudblockers.service.OpenAIRequestService;
import com.ms.cloudblockers.service.OpenAIResponseService;

@Service
public class CloudBlockersProcessor {

    @Autowired
    private FileScannerService scannerService;

    @Autowired
    private FileReaderService readerService;

    @Autowired
    OpenAIRequestService openAIReq;

    @Autowired
    OpenAIResponseService openAIResp;

    Logger logger = LoggerFactory.getLogger(CloudBlockersProcessor.class);

    public List<ClassResponse> process(String projPath) {
        String extension = ".java";
        try {
            List<Path> filesList = scannerService.scan(projPath, extension);
            Map<String, String> classFileContentMap = new HashMap<>();
            for (Path filePath : filesList) {
                String classFileContent = readerService.read(filePath);
                classFileContentMap.put(filePath.getFileName().toString(), classFileContent);
            }
            return processFiles(classFileContentMap);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    private List<ClassResponse> processFiles(Map<String, String> classFilesMap) {
        String systemPrompt = openAIReq.generateSystemPrompt();
        List<CompletableFuture<ClassResponse>> respList = new ArrayList<>();
        for (String classFile : classFilesMap.keySet()) {
            respList.add(CompletableFuture.supplyAsync(() -> {
                String userPrompt = openAIReq.generateUserPrompt(classFilesMap.get(classFile));
                logger.info("Final User Prompt: " + userPrompt);
                String resp = openAIResp.generateText(systemPrompt, userPrompt);
                ClassResponse jsonResp = openAIResp.jsonToPojo(resp);
                return jsonResp;
            }));
        }
        CompletableFuture<Void> allOf = CompletableFuture.allOf(respList.toArray(new CompletableFuture[0]));
        CompletableFuture<List<ClassResponse>> allOfResult = allOf.thenApply(v -> respList.stream()
                .map(CompletableFuture::join)
                .collect(Collectors.toList()));
        List<ClassResponse> results = allOfResult.join();
        return results;
    }

}
