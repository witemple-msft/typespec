// <auto-generated/>

#nullable disable

using System;
using System.ClientModel;
using System.ClientModel.Primitives;
using System.Text.Json;

namespace _Type.Union.Models
{
    public partial class SendRequest5 : IJsonModel<SendRequest5>
    {
        void IJsonModel<SendRequest5>.Write(Utf8JsonWriter writer, ModelReaderWriterOptions options) => throw null;

        protected virtual void JsonModelWriteCore(Utf8JsonWriter writer, ModelReaderWriterOptions options) => throw null;

        SendRequest5 IJsonModel<SendRequest5>.Create(ref Utf8JsonReader reader, ModelReaderWriterOptions options) => throw null;

        protected virtual SendRequest5 JsonModelCreateCore(ref Utf8JsonReader reader, ModelReaderWriterOptions options) => throw null;

        BinaryData IPersistableModel<SendRequest5>.Write(ModelReaderWriterOptions options) => throw null;

        protected virtual BinaryData PersistableModelWriteCore(ModelReaderWriterOptions options) => throw null;

        SendRequest5 IPersistableModel<SendRequest5>.Create(BinaryData data, ModelReaderWriterOptions options) => throw null;

        protected virtual SendRequest5 PersistableModelCreateCore(BinaryData data, ModelReaderWriterOptions options) => throw null;

        string IPersistableModel<SendRequest5>.GetFormatFromOptions(ModelReaderWriterOptions options) => throw null;

        public static implicit operator BinaryContent(SendRequest5 sendRequest5) => throw null;

        public static explicit operator SendRequest5(ClientResult result) => throw null;
    }
}