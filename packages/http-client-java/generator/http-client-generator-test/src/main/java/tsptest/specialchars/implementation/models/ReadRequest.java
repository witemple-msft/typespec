// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
// Code generated by Microsoft (R) TypeSpec Code Generator.

package tsptest.specialchars.implementation.models;

import com.azure.core.annotation.Generated;
import com.azure.core.annotation.Immutable;
import com.azure.json.JsonReader;
import com.azure.json.JsonSerializable;
import com.azure.json.JsonToken;
import com.azure.json.JsonWriter;
import java.io.IOException;

/**
 * The ReadRequest model.
 */
@Immutable
public final class ReadRequest implements JsonSerializable<ReadRequest> {
    /*
     * The id property.
     */
    @Generated
    private final String id;

    /**
     * Creates an instance of ReadRequest class.
     * 
     * @param id the id value to set.
     */
    @Generated
    public ReadRequest(String id) {
        this.id = id;
    }

    /**
     * Get the id property: The id property.
     * 
     * @return the id value.
     */
    @Generated
    public String getId() {
        return this.id;
    }

    /**
     * {@inheritDoc}
     */
    @Generated
    @Override
    public JsonWriter toJson(JsonWriter jsonWriter) throws IOException {
        jsonWriter.writeStartObject();
        jsonWriter.writeStringField("id", this.id);
        return jsonWriter.writeEndObject();
    }

    /**
     * Reads an instance of ReadRequest from the JsonReader.
     * 
     * @param jsonReader The JsonReader being read.
     * @return An instance of ReadRequest if the JsonReader was pointing to an instance of it, or null if it was
     * pointing to JSON null.
     * @throws IllegalStateException If the deserialized JSON object was missing any required properties.
     * @throws IOException If an error occurs while reading the ReadRequest.
     */
    @Generated
    public static ReadRequest fromJson(JsonReader jsonReader) throws IOException {
        return jsonReader.readObject(reader -> {
            String id = null;
            while (reader.nextToken() != JsonToken.END_OBJECT) {
                String fieldName = reader.getFieldName();
                reader.nextToken();

                if ("id".equals(fieldName)) {
                    id = reader.getString();
                } else {
                    reader.skipChildren();
                }
            }
            return new ReadRequest(id);
        });
    }
}
