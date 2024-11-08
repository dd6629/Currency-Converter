package com.dd.currency;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/v1/exchange")
public class CurrencyController {
    @Autowired
    private CurrencyService currencyService;

    @GetMapping("/status")
    public ResponseEntity<String> status() {
        return new ResponseEntity<>("Service is up and running", HttpStatus.OK);
    }

    @GetMapping("/all")
    public ResponseEntity<List<Currency>> getAllCurrencies() {
        return new ResponseEntity<>(currencyService.getAllCurrencies(), HttpStatus.OK);
    }

}