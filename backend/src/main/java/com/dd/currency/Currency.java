package com.dd.currency;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "exchange")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Currency {
    @Id
    private ObjectId id;
    private String type;
    private double value;
}