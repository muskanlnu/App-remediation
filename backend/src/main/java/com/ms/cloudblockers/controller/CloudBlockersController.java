package com.ms.cloudblockers.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
// import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ms.cloudblockers.bean.ClassResponse;
import com.ms.cloudblockers.bean.Result;
import com.ms.cloudblockers.exception.UnknownException;
import com.ms.cloudblockers.processor.CloudBlockersProcessor;
import com.ms.cloudblockers.repository.Repository;

import ch.qos.logback.classic.Logger;


@RestController
@RequestMapping("/cloudblockers")
@CrossOrigin(origins = "http://localhost:3000")
public class CloudBlockersController {

  Logger logger = (Logger) org.slf4j.LoggerFactory.getLogger(CloudBlockersController.class);

  @Autowired
  CloudBlockersProcessor processor;

  @Autowired
  Repository repository;

  // @SuppressWarnings("null")
  @GetMapping("/getblockers")
  public ResponseEntity<List<ClassResponse>> getMyClass(@RequestParam("filePath") String filePath) {
    logger.info("Processing file: " + filePath);
    List<ClassResponse> respList = processor.process(filePath);
  return new ResponseEntity<>(respList, HttpStatus.OK);
  }

  @PostMapping("/saveblockers")
  public ResponseEntity<Result> saveBlockers(@RequestBody Result result) {
    try {
      Result res = new Result(result.getFilePath(), result.getResponses(), result.getTimestamp());
      repository.save(res);
      return new ResponseEntity<>(res, HttpStatus.OK);
    } catch (Exception e) {
      return new ResponseEntity<>(result, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @GetMapping("/getallblockers")
  public ResponseEntity<List<Result>> getAllResults() {
    try {
      List<Result> result = new ArrayList<Result>();
      repository.findAll().forEach(result::add);
      return new ResponseEntity<List<Result>>(result, HttpStatus.OK);
    } catch (Exception e) {
      throw new UnknownException(e.getMessage());
    }
  }

  @GetMapping("/getBlocker")
  public ResponseEntity<Result> getUserByID(@RequestParam("id") String id) {
    @SuppressWarnings("null")
    Optional<Result> resp = repository.findById(id);
    if (resp.isPresent()) {
      return new ResponseEntity<>(resp.get(), HttpStatus.OK);
    } else {
      throw new UnknownException("No user record exist for given id");
    }

  }

}
