// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

package type.property.optional;

import java.time.Duration;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import type.property.optional.models.DurationProperty;

class DurationOperationClientTest {

    DurationOperationClient client = new OptionalClientBuilder().buildDurationOperationClient();

    @Test
    void getAll() {
        DurationProperty durationProperty = client.getAll();
        Assertions.assertEquals("PT2974H14M12.011S", durationProperty.getProperty().toString());
    }

    @Test
    void getDefault() {
        DurationProperty durationProperty = client.getDefault();
        Assertions.assertNull(durationProperty.getProperty());
    }

    @Test
    void putAll() {
        Duration duration = Duration.parse("PT2974H14M12.011S");
        DurationProperty property = new DurationProperty();
        property.setProperty(duration);
        client.putAll(property);
    }

    @Test
    void putDefault() {
        DurationProperty property = new DurationProperty();
        client.putDefault(property);
    }
}
