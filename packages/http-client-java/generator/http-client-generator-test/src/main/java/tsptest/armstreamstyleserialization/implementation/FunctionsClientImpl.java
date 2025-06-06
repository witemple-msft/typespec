// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
// Code generated by Microsoft (R) TypeSpec Code Generator.

package tsptest.armstreamstyleserialization.implementation;

import com.azure.core.annotation.BodyParam;
import com.azure.core.annotation.ExpectedResponses;
import com.azure.core.annotation.HeaderParam;
import com.azure.core.annotation.Host;
import com.azure.core.annotation.HostParam;
import com.azure.core.annotation.Put;
import com.azure.core.annotation.ReturnType;
import com.azure.core.annotation.ServiceInterface;
import com.azure.core.annotation.ServiceMethod;
import com.azure.core.annotation.UnexpectedResponseExceptionType;
import com.azure.core.http.rest.Response;
import com.azure.core.http.rest.RestProxy;
import com.azure.core.management.exception.ManagementException;
import com.azure.core.util.Context;
import com.azure.core.util.FluxUtil;
import reactor.core.publisher.Mono;
import tsptest.armstreamstyleserialization.fluent.FunctionsClient;
import tsptest.armstreamstyleserialization.fluent.models.FunctionInner;

/**
 * An instance of this class provides access to all the operations defined in FunctionsClient.
 */
public final class FunctionsClientImpl implements FunctionsClient {
    /**
     * The proxy service used to perform REST calls.
     */
    private final FunctionsService service;

    /**
     * The service client containing this operation class.
     */
    private final ArmStreamStyleSerializationClientImpl client;

    /**
     * Initializes an instance of FunctionsClientImpl.
     * 
     * @param client the instance of the service client containing this operation class.
     */
    FunctionsClientImpl(ArmStreamStyleSerializationClientImpl client) {
        this.service
            = RestProxy.create(FunctionsService.class, client.getHttpPipeline(), client.getSerializerAdapter());
        this.client = client;
    }

    /**
     * The interface defining all the services for ArmStreamStyleSerializationClientFunctions to be used by the proxy
     * service to perform REST calls.
     */
    @Host("{endpoint}")
    @ServiceInterface(name = "ArmStreamStyleSerial")
    public interface FunctionsService {
        @Put("/function")
        @ExpectedResponses({ 200 })
        @UnexpectedResponseExceptionType(ManagementException.class)
        Mono<Response<FunctionInner>> createFunction(@HostParam("endpoint") String endpoint,
            @HeaderParam("Content-Type") String contentType, @HeaderParam("Accept") String accept,
            @BodyParam("application/json") FunctionInner function, Context context);
    }

    /**
     * The createFunction operation.
     * 
     * @param function The function parameter.
     * @throws IllegalArgumentException thrown if parameters fail the validation.
     * @throws ManagementException thrown if the request is rejected by server.
     * @throws RuntimeException all other wrapped checked exceptions if the request fails to be sent.
     * @return the response body along with {@link Response} on successful completion of {@link Mono}.
     */
    @ServiceMethod(returns = ReturnType.SINGLE)
    private Mono<Response<FunctionInner>> createFunctionWithResponseAsync(FunctionInner function) {
        if (this.client.getEndpoint() == null) {
            return Mono.error(
                new IllegalArgumentException("Parameter this.client.getEndpoint() is required and cannot be null."));
        }
        if (function == null) {
            return Mono.error(new IllegalArgumentException("Parameter function is required and cannot be null."));
        } else {
            function.validate();
        }
        final String contentType = "application/json";
        final String accept = "application/json";
        return FluxUtil
            .withContext(
                context -> service.createFunction(this.client.getEndpoint(), contentType, accept, function, context))
            .contextWrite(context -> context.putAll(FluxUtil.toReactorContext(this.client.getContext()).readOnly()));
    }

    /**
     * The createFunction operation.
     * 
     * @param function The function parameter.
     * @param context The context to associate with this operation.
     * @throws IllegalArgumentException thrown if parameters fail the validation.
     * @throws ManagementException thrown if the request is rejected by server.
     * @throws RuntimeException all other wrapped checked exceptions if the request fails to be sent.
     * @return the response body along with {@link Response} on successful completion of {@link Mono}.
     */
    @ServiceMethod(returns = ReturnType.SINGLE)
    private Mono<Response<FunctionInner>> createFunctionWithResponseAsync(FunctionInner function, Context context) {
        if (this.client.getEndpoint() == null) {
            return Mono.error(
                new IllegalArgumentException("Parameter this.client.getEndpoint() is required and cannot be null."));
        }
        if (function == null) {
            return Mono.error(new IllegalArgumentException("Parameter function is required and cannot be null."));
        } else {
            function.validate();
        }
        final String contentType = "application/json";
        final String accept = "application/json";
        context = this.client.mergeContext(context);
        return service.createFunction(this.client.getEndpoint(), contentType, accept, function, context);
    }

    /**
     * The createFunction operation.
     * 
     * @param function The function parameter.
     * @throws IllegalArgumentException thrown if parameters fail the validation.
     * @throws ManagementException thrown if the request is rejected by server.
     * @throws RuntimeException all other wrapped checked exceptions if the request fails to be sent.
     * @return the response body on successful completion of {@link Mono}.
     */
    @ServiceMethod(returns = ReturnType.SINGLE)
    private Mono<FunctionInner> createFunctionAsync(FunctionInner function) {
        return createFunctionWithResponseAsync(function).flatMap(res -> Mono.justOrEmpty(res.getValue()));
    }

    /**
     * The createFunction operation.
     * 
     * @param function The function parameter.
     * @param context The context to associate with this operation.
     * @throws IllegalArgumentException thrown if parameters fail the validation.
     * @throws ManagementException thrown if the request is rejected by server.
     * @throws RuntimeException all other wrapped checked exceptions if the request fails to be sent.
     * @return the response body along with {@link Response}.
     */
    @ServiceMethod(returns = ReturnType.SINGLE)
    public Response<FunctionInner> createFunctionWithResponse(FunctionInner function, Context context) {
        return createFunctionWithResponseAsync(function, context).block();
    }

    /**
     * The createFunction operation.
     * 
     * @param function The function parameter.
     * @throws IllegalArgumentException thrown if parameters fail the validation.
     * @throws ManagementException thrown if the request is rejected by server.
     * @throws RuntimeException all other wrapped checked exceptions if the request fails to be sent.
     * @return the response.
     */
    @ServiceMethod(returns = ReturnType.SINGLE)
    public FunctionInner createFunction(FunctionInner function) {
        return createFunctionWithResponse(function, Context.NONE).getValue();
    }
}
