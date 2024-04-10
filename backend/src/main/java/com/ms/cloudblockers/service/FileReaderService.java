package com.ms.cloudblockers.service;

import java.io.BufferedReader;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;


@Service
public class FileReaderService {

    Logger logger = LoggerFactory.getLogger(FileReaderService.class);

    public String read(Path path) {
        StringBuilder fileContent = new StringBuilder();
        try (BufferedReader reader = Files.newBufferedReader(path)) {
            String line;
            while ((line = reader.readLine()) != null) {
                fileContent.append(line).append("\n");
            }
        } catch (IOException e) {
            logger.error("Error while reading the source code file content: ", e);
        }
        return fileContent.toString();
    }

}
