package com.hellokoding.auth.service;

import org.springframework.http.ResponseEntity;

public interface Service {

    ResponseEntity<String> findByFirstName(String firstName);

    ResponseEntity<String> findDataMail(String sender);

    ResponseEntity<String> findNewDataMail();

    ResponseEntity<String> Insert(String json);

    ResponseEntity<String> delete(Long id);

    ResponseEntity<String> update(String body,Long id);

    ResponseEntity<String> findBySender(String sender);

    ResponseEntity<String> findBySubject(String subject);

    ResponseEntity<String> findByEmail(String email);

    ResponseEntity<String> findByResponsible(String responsible);

    ResponseEntity<String> findBytype(String type);

    ResponseEntity<String> findByIdlineAndImgg(String idline);

    ResponseEntity<String> findByContent(String content);

    ResponseEntity<String> findByAll(String sender,String subject,String email,String responsible,String msg,String status,String level,String type);

    ResponseEntity<String> findBySenderAndType(String sender,String type);

    //ResponseEntity<String> findByAll(String findByAll);
    /*ResponseEntity<String> findNewDataMail();
    ResponseEntity<String> findBySubject(String subject);
    ResponseEntity<String> findBysend_To(String send_To);*/
}