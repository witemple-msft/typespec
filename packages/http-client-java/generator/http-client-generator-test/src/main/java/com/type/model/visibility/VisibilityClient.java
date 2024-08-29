// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
// Code generated by Microsoft (R) TypeSpec Code Generator.

package com.type.model.visibility;

import com.azure.core.annotation.Generated;
import com.azure.core.annotation.ReturnType;
import com.azure.core.annotation.ServiceClient;
import com.azure.core.annotation.ServiceMethod;
import com.azure.core.exception.ClientAuthenticationException;
import com.azure.core.exception.HttpResponseException;
import com.azure.core.exception.ResourceModifiedException;
import com.azure.core.exception.ResourceNotFoundException;
import com.azure.core.http.rest.RequestOptions;
import com.azure.core.http.rest.Response;
import com.azure.core.util.BinaryData;
import com.type.model.visibility.implementation.VisibilityClientImpl;
import com.type.model.visibility.models.ReadOnlyModel;
import com.type.model.visibility.models.VisibilityModel;

/**
 * Initializes a new instance of the synchronous VisibilityClient type.
 */
@ServiceClient(builder = VisibilityClientBuilder.class)
public final class VisibilityClient {
    @Generated
    private final VisibilityClientImpl serviceClient;

    /**
     * Initializes an instance of VisibilityClient class.
     * 
     * @param serviceClient the service client implementation.
     */
    @Generated
    VisibilityClient(VisibilityClientImpl serviceClient) {
        this.serviceClient = serviceClient;
    }

    /**
     * The getModel operation.
     * <p><strong>Request Body Schema</strong></p>
     * 
     * <pre>{@code
     * {
     *     readProp: String (Required)
     *     queryProp: Integer (Required)
     *     createProp (Required): [
     *         String (Required)
     *     ]
     *     updateProp (Required): [
     *         int (Required)
     *     ]
     *     deleteProp: Boolean (Required)
     * }
     * }</pre>
     * 
     * <p><strong>Response Body Schema</strong></p>
     * 
     * <pre>{@code
     * {
     *     readProp: String (Required)
     *     queryProp: Integer (Required)
     *     createProp (Required): [
     *         String (Required)
     *     ]
     *     updateProp (Required): [
     *         int (Required)
     *     ]
     *     deleteProp: Boolean (Required)
     * }
     * }</pre>
     * 
     * @param input The input parameter.
     * @param requestOptions The options to configure the HTTP request before HTTP client sends it.
     * @throws HttpResponseException thrown if the request is rejected by server.
     * @throws ClientAuthenticationException thrown if the request is rejected by server on status code 401.
     * @throws ResourceNotFoundException thrown if the request is rejected by server on status code 404.
     * @throws ResourceModifiedException thrown if the request is rejected by server on status code 409.
     * @return output model with visibility properties along with {@link Response}.
     */
    @Generated
    @ServiceMethod(returns = ReturnType.SINGLE)
    public Response<BinaryData> getModelWithResponse(BinaryData input, RequestOptions requestOptions) {
        return this.serviceClient.getModelWithResponse(input, requestOptions);
    }

    /**
     * The headModel operation.
     * <p><strong>Request Body Schema</strong></p>
     * 
     * <pre>{@code
     * {
     *     readProp: String (Required)
     *     queryProp: Integer (Required)
     *     createProp (Required): [
     *         String (Required)
     *     ]
     *     updateProp (Required): [
     *         int (Required)
     *     ]
     *     deleteProp: Boolean (Required)
     * }
     * }</pre>
     * 
     * @param input The input parameter.
     * @param requestOptions The options to configure the HTTP request before HTTP client sends it.
     * @throws HttpResponseException thrown if the request is rejected by server.
     * @throws ClientAuthenticationException thrown if the request is rejected by server on status code 401.
     * @throws ResourceNotFoundException thrown if the request is rejected by server on status code 404.
     * @throws ResourceModifiedException thrown if the request is rejected by server on status code 409.
     * @return the {@link Response}.
     */
    @Generated
    @ServiceMethod(returns = ReturnType.SINGLE)
    public Response<Void> headModelWithResponse(BinaryData input, RequestOptions requestOptions) {
        return this.serviceClient.headModelWithResponse(input, requestOptions);
    }

    /**
     * The putModel operation.
     * <p><strong>Request Body Schema</strong></p>
     * 
     * <pre>{@code
     * {
     *     readProp: String (Required)
     *     queryProp: Integer (Required)
     *     createProp (Required): [
     *         String (Required)
     *     ]
     *     updateProp (Required): [
     *         int (Required)
     *     ]
     *     deleteProp: Boolean (Required)
     * }
     * }</pre>
     * 
     * @param input The input parameter.
     * @param requestOptions The options to configure the HTTP request before HTTP client sends it.
     * @throws HttpResponseException thrown if the request is rejected by server.
     * @throws ClientAuthenticationException thrown if the request is rejected by server on status code 401.
     * @throws ResourceNotFoundException thrown if the request is rejected by server on status code 404.
     * @throws ResourceModifiedException thrown if the request is rejected by server on status code 409.
     * @return the {@link Response}.
     */
    @Generated
    @ServiceMethod(returns = ReturnType.SINGLE)
    public Response<Void> putModelWithResponse(BinaryData input, RequestOptions requestOptions) {
        return this.serviceClient.putModelWithResponse(input, requestOptions);
    }

    /**
     * The patchModel operation.
     * <p><strong>Request Body Schema</strong></p>
     * 
     * <pre>{@code
     * {
     *     readProp: String (Required)
     *     queryProp: Integer (Required)
     *     createProp (Required): [
     *         String (Required)
     *     ]
     *     updateProp (Required): [
     *         int (Required)
     *     ]
     *     deleteProp: Boolean (Required)
     * }
     * }</pre>
     * 
     * @param input The input parameter.
     * @param requestOptions The options to configure the HTTP request before HTTP client sends it.
     * @throws HttpResponseException thrown if the request is rejected by server.
     * @throws ClientAuthenticationException thrown if the request is rejected by server on status code 401.
     * @throws ResourceNotFoundException thrown if the request is rejected by server on status code 404.
     * @throws ResourceModifiedException thrown if the request is rejected by server on status code 409.
     * @return the {@link Response}.
     */
    @Generated
    @ServiceMethod(returns = ReturnType.SINGLE)
    public Response<Void> patchModelWithResponse(BinaryData input, RequestOptions requestOptions) {
        return this.serviceClient.patchModelWithResponse(input, requestOptions);
    }

    /**
     * The postModel operation.
     * <p><strong>Request Body Schema</strong></p>
     * 
     * <pre>{@code
     * {
     *     readProp: String (Required)
     *     queryProp: Integer (Required)
     *     createProp (Required): [
     *         String (Required)
     *     ]
     *     updateProp (Required): [
     *         int (Required)
     *     ]
     *     deleteProp: Boolean (Required)
     * }
     * }</pre>
     * 
     * @param input The input parameter.
     * @param requestOptions The options to configure the HTTP request before HTTP client sends it.
     * @throws HttpResponseException thrown if the request is rejected by server.
     * @throws ClientAuthenticationException thrown if the request is rejected by server on status code 401.
     * @throws ResourceNotFoundException thrown if the request is rejected by server on status code 404.
     * @throws ResourceModifiedException thrown if the request is rejected by server on status code 409.
     * @return the {@link Response}.
     */
    @Generated
    @ServiceMethod(returns = ReturnType.SINGLE)
    public Response<Void> postModelWithResponse(BinaryData input, RequestOptions requestOptions) {
        return this.serviceClient.postModelWithResponse(input, requestOptions);
    }

    /**
     * The deleteModel operation.
     * <p><strong>Request Body Schema</strong></p>
     * 
     * <pre>{@code
     * {
     *     readProp: String (Required)
     *     queryProp: Integer (Required)
     *     createProp (Required): [
     *         String (Required)
     *     ]
     *     updateProp (Required): [
     *         int (Required)
     *     ]
     *     deleteProp: Boolean (Required)
     * }
     * }</pre>
     * 
     * @param input The input parameter.
     * @param requestOptions The options to configure the HTTP request before HTTP client sends it.
     * @throws HttpResponseException thrown if the request is rejected by server.
     * @throws ClientAuthenticationException thrown if the request is rejected by server on status code 401.
     * @throws ResourceNotFoundException thrown if the request is rejected by server on status code 404.
     * @throws ResourceModifiedException thrown if the request is rejected by server on status code 409.
     * @return the {@link Response}.
     */
    @Generated
    @ServiceMethod(returns = ReturnType.SINGLE)
    public Response<Void> deleteModelWithResponse(BinaryData input, RequestOptions requestOptions) {
        return this.serviceClient.deleteModelWithResponse(input, requestOptions);
    }

    /**
     * The putReadOnlyModel operation.
     * <p><strong>Request Body Schema</strong></p>
     * 
     * <pre>{@code
     * {
     *     optionalNullableIntList (Optional): [
     *         int (Optional)
     *     ]
     *     optionalStringRecord (Optional): {
     *         String: String (Required)
     *     }
     * }
     * }</pre>
     * 
     * <p><strong>Response Body Schema</strong></p>
     * 
     * <pre>{@code
     * {
     *     optionalNullableIntList (Optional): [
     *         int (Optional)
     *     ]
     *     optionalStringRecord (Optional): {
     *         String: String (Required)
     *     }
     * }
     * }</pre>
     * 
     * @param input The input parameter.
     * @param requestOptions The options to configure the HTTP request before HTTP client sends it.
     * @throws HttpResponseException thrown if the request is rejected by server.
     * @throws ClientAuthenticationException thrown if the request is rejected by server on status code 401.
     * @throws ResourceNotFoundException thrown if the request is rejected by server on status code 404.
     * @throws ResourceModifiedException thrown if the request is rejected by server on status code 409.
     * @return roundTrip model with readonly optional properties along with {@link Response}.
     */
    @Generated
    @ServiceMethod(returns = ReturnType.SINGLE)
    public Response<BinaryData> putReadOnlyModelWithResponse(BinaryData input, RequestOptions requestOptions) {
        return this.serviceClient.putReadOnlyModelWithResponse(input, requestOptions);
    }

    /**
     * The getModel operation.
     * 
     * @param input The input parameter.
     * @throws IllegalArgumentException thrown if parameters fail the validation.
     * @throws HttpResponseException thrown if the request is rejected by server.
     * @throws ClientAuthenticationException thrown if the request is rejected by server on status code 401.
     * @throws ResourceNotFoundException thrown if the request is rejected by server on status code 404.
     * @throws ResourceModifiedException thrown if the request is rejected by server on status code 409.
     * @throws RuntimeException all other wrapped checked exceptions if the request fails to be sent.
     * @return output model with visibility properties.
     */
    @Generated
    @ServiceMethod(returns = ReturnType.SINGLE)
    public VisibilityModel getModel(VisibilityModel input) {
        // Generated convenience method for getModelWithResponse
        RequestOptions requestOptions = new RequestOptions();
        return getModelWithResponse(BinaryData.fromObject(input), requestOptions).getValue()
            .toObject(VisibilityModel.class);
    }

    /**
     * The headModel operation.
     * 
     * @param input The input parameter.
     * @throws IllegalArgumentException thrown if parameters fail the validation.
     * @throws HttpResponseException thrown if the request is rejected by server.
     * @throws ClientAuthenticationException thrown if the request is rejected by server on status code 401.
     * @throws ResourceNotFoundException thrown if the request is rejected by server on status code 404.
     * @throws ResourceModifiedException thrown if the request is rejected by server on status code 409.
     * @throws RuntimeException all other wrapped checked exceptions if the request fails to be sent.
     */
    @Generated
    @ServiceMethod(returns = ReturnType.SINGLE)
    public void headModel(VisibilityModel input) {
        // Generated convenience method for headModelWithResponse
        RequestOptions requestOptions = new RequestOptions();
        headModelWithResponse(BinaryData.fromObject(input), requestOptions).getValue();
    }

    /**
     * The putModel operation.
     * 
     * @param input The input parameter.
     * @throws IllegalArgumentException thrown if parameters fail the validation.
     * @throws HttpResponseException thrown if the request is rejected by server.
     * @throws ClientAuthenticationException thrown if the request is rejected by server on status code 401.
     * @throws ResourceNotFoundException thrown if the request is rejected by server on status code 404.
     * @throws ResourceModifiedException thrown if the request is rejected by server on status code 409.
     * @throws RuntimeException all other wrapped checked exceptions if the request fails to be sent.
     */
    @Generated
    @ServiceMethod(returns = ReturnType.SINGLE)
    public void putModel(VisibilityModel input) {
        // Generated convenience method for putModelWithResponse
        RequestOptions requestOptions = new RequestOptions();
        putModelWithResponse(BinaryData.fromObject(input), requestOptions).getValue();
    }

    /**
     * The patchModel operation.
     * 
     * @param input The input parameter.
     * @throws IllegalArgumentException thrown if parameters fail the validation.
     * @throws HttpResponseException thrown if the request is rejected by server.
     * @throws ClientAuthenticationException thrown if the request is rejected by server on status code 401.
     * @throws ResourceNotFoundException thrown if the request is rejected by server on status code 404.
     * @throws ResourceModifiedException thrown if the request is rejected by server on status code 409.
     * @throws RuntimeException all other wrapped checked exceptions if the request fails to be sent.
     */
    @Generated
    @ServiceMethod(returns = ReturnType.SINGLE)
    public void patchModel(VisibilityModel input) {
        // Generated convenience method for patchModelWithResponse
        RequestOptions requestOptions = new RequestOptions();
        patchModelWithResponse(BinaryData.fromObject(input), requestOptions).getValue();
    }

    /**
     * The postModel operation.
     * 
     * @param input The input parameter.
     * @throws IllegalArgumentException thrown if parameters fail the validation.
     * @throws HttpResponseException thrown if the request is rejected by server.
     * @throws ClientAuthenticationException thrown if the request is rejected by server on status code 401.
     * @throws ResourceNotFoundException thrown if the request is rejected by server on status code 404.
     * @throws ResourceModifiedException thrown if the request is rejected by server on status code 409.
     * @throws RuntimeException all other wrapped checked exceptions if the request fails to be sent.
     */
    @Generated
    @ServiceMethod(returns = ReturnType.SINGLE)
    public void postModel(VisibilityModel input) {
        // Generated convenience method for postModelWithResponse
        RequestOptions requestOptions = new RequestOptions();
        postModelWithResponse(BinaryData.fromObject(input), requestOptions).getValue();
    }

    /**
     * The deleteModel operation.
     * 
     * @param input The input parameter.
     * @throws IllegalArgumentException thrown if parameters fail the validation.
     * @throws HttpResponseException thrown if the request is rejected by server.
     * @throws ClientAuthenticationException thrown if the request is rejected by server on status code 401.
     * @throws ResourceNotFoundException thrown if the request is rejected by server on status code 404.
     * @throws ResourceModifiedException thrown if the request is rejected by server on status code 409.
     * @throws RuntimeException all other wrapped checked exceptions if the request fails to be sent.
     */
    @Generated
    @ServiceMethod(returns = ReturnType.SINGLE)
    public void deleteModel(VisibilityModel input) {
        // Generated convenience method for deleteModelWithResponse
        RequestOptions requestOptions = new RequestOptions();
        deleteModelWithResponse(BinaryData.fromObject(input), requestOptions).getValue();
    }

    /**
     * The putReadOnlyModel operation.
     * 
     * @param input The input parameter.
     * @throws IllegalArgumentException thrown if parameters fail the validation.
     * @throws HttpResponseException thrown if the request is rejected by server.
     * @throws ClientAuthenticationException thrown if the request is rejected by server on status code 401.
     * @throws ResourceNotFoundException thrown if the request is rejected by server on status code 404.
     * @throws ResourceModifiedException thrown if the request is rejected by server on status code 409.
     * @throws RuntimeException all other wrapped checked exceptions if the request fails to be sent.
     * @return roundTrip model with readonly optional properties.
     */
    @Generated
    @ServiceMethod(returns = ReturnType.SINGLE)
    public ReadOnlyModel putReadOnlyModel(ReadOnlyModel input) {
        // Generated convenience method for putReadOnlyModelWithResponse
        RequestOptions requestOptions = new RequestOptions();
        return putReadOnlyModelWithResponse(BinaryData.fromObject(input), requestOptions).getValue()
            .toObject(ReadOnlyModel.class);
    }
}