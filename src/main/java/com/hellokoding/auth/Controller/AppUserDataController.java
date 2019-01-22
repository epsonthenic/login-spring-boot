package com.hellokoding.auth.Controller;


import com.hellokoding.auth.service.Service;
import org.apache.tomcat.util.http.fileupload.IOUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.activation.MimetypesFileTypeMap;
import javax.servlet.http.HttpServletResponse;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;

@RestController
@RequestMapping("/appUsers")
public class AppUserDataController {

    private Logger LOGGER = LoggerFactory.getLogger(this.getClass());

    @Autowired
    private Service service;

    @RequestMapping(value = "/findDataMail", method = RequestMethod.GET)
    public String findDataMail(@RequestParam("sender") String sender) {
        LOGGER.info("sender : {}", sender);
        return service.findDataMail(sender).getBody();
    }

    @RequestMapping(value = "/findNewDataMail")
    public String findNewDataMail() {
        LOGGER.info("sender : {}", service.findNewDataMail().getBody());
        return service.findNewDataMail().getBody();
    }

    @RequestMapping(value = "/insert", method = RequestMethod.POST)
    public String insertData(@RequestBody String json) {
        return service.Insert(json).getBody();
    }

    @RequestMapping(value = "/del/{id}", method = RequestMethod.DELETE)
    public void DeleteByID(@PathVariable("id") Long id) {
        service.delete(id);
    }

    @RequestMapping(value = "/update/{id}", method = RequestMethod.PUT)
    public String update(@RequestBody String body, @PathVariable("id") Long id, Model model) {
        //@ModelAttribute("userForm") User userForm
        LOGGER.info("sender : {}", body);
        return service.update(body, id).getBody();
    }





    @RequestMapping(value = "/findBySender", method = RequestMethod.GET)
    public String findBySender(@RequestParam("sender") String sender) {
        LOGGER.info("sender : {}", sender);
        return service.findBySender(sender).getBody();
    }

    @RequestMapping(value = "/findBySubject", method = RequestMethod.GET)
    public String findBySubject(@RequestParam("subject") String subject) {
        LOGGER.info("subject : {}", subject);
        return service.findBySubject(subject).getBody();
    }

    @RequestMapping(value = "/findByEmail", method = RequestMethod.GET)
    public String findByMail(@RequestParam("email") String email) {
        LOGGER.info("email : {}", email);
        return service.findByEmail(email).getBody();
    }

    @RequestMapping(value = "/findByResponsible", method = RequestMethod.GET)
    public String findByResponsible(@RequestParam("responsible") String responsible) {
        LOGGER.info("responsible : {}", responsible);
        return service.findByResponsible(responsible).getBody();
    }

    @RequestMapping(value = "/findByType", method = RequestMethod.GET)
    public String findBytype(@RequestParam("type") String type) {
        LOGGER.info("responsible : {}", type);
        return service.findBytype(type).getBody();
    }

    @RequestMapping(value = "/findByIdline", method = RequestMethod.GET)
    public String findByIdlineAndImgg(@RequestParam ("idline")String idline){
        LOGGER.info("responsible : {}",idline);
        return service.findByIdlineAndImgg(idline).getBody();
    }

    @RequestMapping(value = "/findByContent", method = RequestMethod.GET)
    public String findByContent(@RequestParam ("content")String content){
        LOGGER.info("content : {}",content);
        return service.findByContent(content).getBody();
    }
    @RequestMapping(value = "/findBySenderAndType", method = RequestMethod.GET)
    public String findBySenderAndType(@RequestParam ("sender")String sender,@RequestParam ("")String type){
        LOGGER.info("content : {}",sender,type);
        return service.findBySenderAndType(sender,type).getBody();
    }
    @RequestMapping(value = "/findByAll", method = RequestMethod.GET)
    public String findByAll(@RequestParam ("sender")String sender,@RequestParam ("subject")String subject,@RequestParam ("email")String email,@RequestParam ("responsible")String responsible,@RequestParam ("msg")String msg,@RequestParam ("status")String status,@RequestParam ("level")String level,@RequestParam ("type")String type){
        LOGGER.info("content : {}",sender,subject,email,responsible,msg,status,level,type);
        return service.findByAll(sender,subject,email,responsible,msg,status,level,type).getBody();
    }

    @RequestMapping(value = "/download", method = RequestMethod.GET)
    public void downloadRegisterManual(@RequestParam("filename") String filename, HttpServletResponse response) throws IOException {
        String filePath = "/home/pang/File_mail/" + filename;
        HttpHeaders headers = new HttpHeaders();
        String mineType = new MimetypesFileTypeMap().getContentType(filePath);
        response.setHeader("Content-disposition", "attachment; filename=" + filename);
        headers.add("Content-Type", mineType + ";charset=utf-8");
        try {
            InputStream inputStream = new FileInputStream(filePath);
            IOUtils.copy(inputStream, response.getOutputStream());
            IOUtils.closeQuietly(inputStream);
        } catch (IOException ex) {
            LOGGER.error("Error writing file to output stream. Filename was '{}'", filePath, ex);
            throw new RuntimeException("IOError writing file to output stream");
        }
    }
    //level-status
    @RequestMapping(value = "/download1", method = RequestMethod.GET)
    public void downloadRegisterManual1(@RequestParam("filename") String filename, HttpServletResponse response) throws IOException {
        String filePath = "/home/pang/File_Line/" + filename;
        HttpHeaders headers = new HttpHeaders();
        String mineType = new MimetypesFileTypeMap().getContentType(filePath);
        response.setHeader("Content-disposition", "attachment; filename=" + filename);
        headers.add("Content-Type", mineType + ";charset=utf-8");
        try {
            InputStream inputStream = new FileInputStream(filePath);
            IOUtils.copy(inputStream, response.getOutputStream());
            IOUtils.closeQuietly(inputStream);
        } catch (IOException ex) {
            LOGGER.error("Error writing file to output stream. Filename was '{}'", filePath, ex);
            throw new RuntimeException("IOError writing file to output stream");
        }
    }

}
