package com.ms.cloudblockers.repository;

//import java.util.List;

import com.azure.spring.data.cosmos.repository.CosmosRepository;
//import com.ms.cloudblockers.bean.ClassResponse;
// import com.ms.cloudblockers.bean.Result;
import com.ms.cloudblockers.bean.Result;

public interface Repository extends CosmosRepository<Result, String>{
    
}
