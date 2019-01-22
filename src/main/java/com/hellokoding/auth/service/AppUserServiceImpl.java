package com.hellokoding.auth.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

@Service
public class AppUserServiceImpl implements com.hellokoding.auth.service.Service {

    private Logger LOGGER = LoggerFactory.getLogger(this.getClass());
    @Value("${engine.url}")
    private String ENGINE_URL;

    @Override
    public ResponseEntity<String> findByFirstName(String firstName) {
        RestTemplate restTemplate = new RestTemplate();
        String url = ENGINE_URL.concat("/appUserCustom/findByFirstName");
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON_UTF8);
        UriComponentsBuilder builder = UriComponentsBuilder.fromHttpUrl(url).queryParam("firstName", firstName);
        HttpEntity<String> entity = new HttpEntity<String>("", headers);
        LOGGER.info("request :{}", url);
        try {
            return restTemplate.exchange(builder.toUriString(), HttpMethod.GET, entity, String.class);
        } catch (Exception e) {
            LOGGER.error("{}", e.getMessage());
            e.printStackTrace();
            throw new RuntimeException(e);
        }
    }

    @Override
    public ResponseEntity<String> findDataMail(String sender) {
        RestTemplate restTemplate = new RestTemplate();
        String url = ENGINE_URL.concat("/appMailDataCustom/getDataAll");
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON_UTF8);
        UriComponentsBuilder builder = UriComponentsBuilder.fromHttpUrl(url).queryParam("sender", sender);
        HttpEntity<String> entity = new HttpEntity<String>("", headers);
        LOGGER.info("request :{}", url);
        try {
            return restTemplate.exchange(builder.toUriString(), HttpMethod.GET, entity, String.class);
        } catch (Exception e) {
            LOGGER.error("{}", e.getMessage());
            e.printStackTrace();
            throw new RuntimeException(e);
        }
    }

    @Override
    public ResponseEntity<String> Insert(String json) {
        LOGGER.info("{}",json);
        RestTemplate restTemplate = new RestTemplate();
        String url = ENGINE_URL.concat("/appMailDataCustom/savebyjson");
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON_UTF8);
        HttpEntity<String> entity = new HttpEntity<String>(json, headers);
        LOGGER.info("request :{}", url);
        try {
            return restTemplate.exchange(url,HttpMethod.POST, entity, String.class);
        } catch (Exception e) {
            LOGGER.error("{}", e.getMessage());
            e.printStackTrace();
            throw new RuntimeException(e);
        }
    }

    @Override
    public ResponseEntity<String> findNewDataMail() {
        RestTemplate restTemplate = new RestTemplate();
       // String url = ENGINE_URL.concat("/appMailDataCustom/getNewDataAll");
        String url = ENGINE_URL.concat("/appMailDataCustom/getCusNewData");
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON_UTF8);
        UriComponentsBuilder builder = UriComponentsBuilder.fromHttpUrl(url).queryParam("");
        HttpEntity<String> entity = new HttpEntity<String>("", headers);
        LOGGER.info("request :{}", url);
        try {
            return restTemplate.exchange(builder.toUriString(), HttpMethod.GET, entity, String.class);
        } catch (Exception e) {
            LOGGER.error("{}", e.getMessage());
            e.printStackTrace();
            throw new RuntimeException(e);
        }
    }

    @Override
    public ResponseEntity<String> update(String body, Long id) {
        RestTemplate restTemplate = new RestTemplate();
        String url = ENGINE_URL.concat("/appMailDataCustom/editData/"+ id);
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON_UTF8);

        HttpEntity<String> entity = new HttpEntity<String>(body, headers);
        LOGGER.info("request :{id}", url);
        try {
            return restTemplate.exchange(url, HttpMethod.PUT, entity, String.class);
        } catch (Exception e) {
            LOGGER.error("{}", e.getMessage());
            e.printStackTrace();
            throw new RuntimeException(e);
        }
    }

    @Override
    public ResponseEntity<String> findBySender(String sender) {
        RestTemplate restTemplate = new RestTemplate();
        String url = ENGINE_URL.concat("/appMailDataCustom/getDataBySender");
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON_UTF8);
        UriComponentsBuilder builder = UriComponentsBuilder.fromHttpUrl(url).queryParam("sender",sender);
        HttpEntity<String> entity = new HttpEntity<String>("", headers);
        LOGGER.info("request :{}", url);
        try {
            return restTemplate.exchange(builder.toUriString(), HttpMethod.GET, entity, String.class);
        } catch (Exception e) {
            LOGGER.error("{}", e.getMessage());
            e.printStackTrace();
            throw new RuntimeException(e);
        }
    }

    @Override
    public ResponseEntity<String> delete(Long id) {
        RestTemplate restTemplate = new RestTemplate();
        String url = ENGINE_URL.concat("/appMailDataCustom/del/"+id);
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON_UTF8);
        HttpEntity<String> entity = new HttpEntity<String>("id", headers);
        LOGGER.info("request :{}", url);
        try {
            return restTemplate.exchange(url,HttpMethod.DELETE, entity, String.class);
        } catch (Exception e) {
            LOGGER.error("{}", e.getMessage());
            e.printStackTrace();
            throw new RuntimeException(e);
        }
    }

    @Override
    public ResponseEntity<String> findBytype(String type) {
        RestTemplate restTemplate = new RestTemplate();
        String url = ENGINE_URL.concat("/appMailDataCustom/getDataByType");
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON_UTF8);
        UriComponentsBuilder builder = UriComponentsBuilder.fromHttpUrl(url).queryParam("type",type);
        HttpEntity<String> entity = new HttpEntity<String>("", headers);
        LOGGER.info("request :{}", url);
        try {
            return restTemplate.exchange(builder.toUriString(), HttpMethod.GET, entity, String.class);
        } catch (Exception e) {
            LOGGER.error("{}", e.getMessage());
            e.printStackTrace();
            throw new RuntimeException(e);
        }
    }

    @Override
    public ResponseEntity<String> findBySubject(String subject) {
        RestTemplate restTemplate = new RestTemplate();
        String url = ENGINE_URL.concat("/appMailDataCustom/getDataBySubject");
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON_UTF8);
        UriComponentsBuilder builder = UriComponentsBuilder.fromHttpUrl(url).queryParam("subject",subject);
        HttpEntity<String> entity = new HttpEntity<String>("", headers);
        LOGGER.info("request :{}", url);
        try {
            return restTemplate.exchange(builder.toUriString(), HttpMethod.GET, entity, String.class);
        } catch (Exception e) {
            LOGGER.error("{}", e.getMessage());
            e.printStackTrace();
            throw new RuntimeException(e);
        }
    }

    @Override
    public ResponseEntity<String> findByEmail(String email) {
        RestTemplate restTemplate = new RestTemplate();
        String url = ENGINE_URL.concat("/appMailDataCustom/getDataByEmail");
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON_UTF8);
        UriComponentsBuilder builder = UriComponentsBuilder.fromHttpUrl(url).queryParam("email",email);
        HttpEntity<String> entity = new HttpEntity<String>("", headers);
        LOGGER.info("request :{}", url);
        try {
            return restTemplate.exchange(builder.toUriString(), HttpMethod.GET, entity, String.class);
        } catch (Exception e) {
            LOGGER.error("{}", e.getMessage());
            e.printStackTrace();
            throw new RuntimeException(e);
        }
    }

    @Override
    public ResponseEntity<String> findByResponsible(String responsible) {
        RestTemplate restTemplate = new RestTemplate();
        String url = ENGINE_URL.concat("/appMailDataCustom/getDataByResponsible");
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON_UTF8);
        UriComponentsBuilder builder = UriComponentsBuilder.fromHttpUrl(url).queryParam("responsible",responsible);
        HttpEntity<String> entity = new HttpEntity<String>("", headers);
        LOGGER.info("request :{}", url);
        try {
            return restTemplate.exchange(builder.toUriString(), HttpMethod.GET, entity, String.class);
        } catch (Exception e) {
            LOGGER.error("{}", e.getMessage());
            e.printStackTrace();
            throw new RuntimeException(e);
        }
    }

    @Override
    public ResponseEntity<String> findByIdlineAndImgg(String idline) {
        RestTemplate restTemplate = new RestTemplate();
        String url = ENGINE_URL.concat("/appMailDataCustom/getDataByImgg");
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON_UTF8);
        UriComponentsBuilder builder = UriComponentsBuilder.fromHttpUrl(url).queryParam("idline",idline);
        HttpEntity<String> entity = new HttpEntity<String>("", headers);
        LOGGER.info("request :{}", url);
        try {
            return restTemplate.exchange(builder.toUriString(), HttpMethod.GET, entity, String.class);
        } catch (Exception e) {
            LOGGER.error("{}", e.getMessage());
            e.printStackTrace();
            throw new RuntimeException(e);
        }
    }

    @Override
    public ResponseEntity<String> findByContent(String content) {
        RestTemplate restTemplate = new RestTemplate();
        String url = ENGINE_URL.concat("/appMailDataCustom/getDataByContent");
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON_UTF8);
        UriComponentsBuilder builder = UriComponentsBuilder.fromHttpUrl(url).queryParam("content",content);
        HttpEntity<String> entity = new HttpEntity<String>("", headers);
        LOGGER.info("request :{}", url);
        try {
            return restTemplate.exchange(builder.toUriString(), HttpMethod.GET, entity, String.class);
        } catch (Exception e) {
            LOGGER.error("{}", e.getMessage());
            e.printStackTrace();
            throw new RuntimeException(e);
        }
    }

    @Override
    public ResponseEntity<String> findBySenderAndType(String sender, String type) {
        RestTemplate restTemplate = new RestTemplate();
        String url = ENGINE_URL.concat("/appMailDataCustom/getDataBySenderAndType");
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON_UTF8);
        UriComponentsBuilder builder = UriComponentsBuilder.fromHttpUrl(url)
                .queryParam("sender",sender)
                .queryParam("type",type);
        HttpEntity<String> entity = new HttpEntity<String>("", headers);
        LOGGER.info("request :{}", url);
        try {
            return restTemplate.exchange(builder.toUriString(), HttpMethod.GET, entity, String.class);
        } catch (Exception e) {
            LOGGER.error("{}", e.getMessage());
            e.printStackTrace();
            throw new RuntimeException(e);
        }
    }

    @Override
    public ResponseEntity<String> findByAll(String sender, String subject, String email, String responsible, String msg, String status, String level, String type) {
        RestTemplate restTemplate = new RestTemplate();
        String url = ENGINE_URL.concat("/appMailDataCustom/getDataByContent");
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON_UTF8);
        UriComponentsBuilder builder = UriComponentsBuilder.fromHttpUrl(url)
                .queryParam("sender",sender)
                .queryParam("subject",subject)
                .queryParam("email",email)
                .queryParam("responsible",responsible)
                .queryParam("msg",msg)
                .queryParam("status",status)
                .queryParam("level",level)
                .queryParam("type",type);
        HttpEntity<String> entity = new HttpEntity<String>("", headers);
        LOGGER.info("request :{}", url);
        try {
            return restTemplate.exchange(builder.toUriString(), HttpMethod.GET, entity, String.class);
        } catch (Exception e) {
            LOGGER.error("{}", e.getMessage());
            e.printStackTrace();
            throw new RuntimeException(e);
        }
    }
}
