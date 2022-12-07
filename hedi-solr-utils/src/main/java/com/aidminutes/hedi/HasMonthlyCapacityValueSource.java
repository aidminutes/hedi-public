package com.aidminutes.hedi;

import java.io.IOException;
import java.util.Date;
import java.util.Map;
import java.util.Set;

import org.apache.lucene.document.Document;
import org.apache.lucene.index.LeafReaderContext;
import org.apache.lucene.queries.function.FunctionValues;
import org.apache.lucene.queries.function.ValueSource;
import org.apache.solr.common.SolrException;
import org.apache.solr.util.DateMathParser;

public class HasMonthlyCapacityValueSource extends ValueSource {

  private Date expectedDeliveryDate;
  private String capacityFieldName;
  private String deliveryDateFieldName;

  public HasMonthlyCapacityValueSource(Date expectedDeliveryDate,
      String deliveryDateFieldName,
      String capacityFieldName) {
    this.expectedDeliveryDate = expectedDeliveryDate;
    this.deliveryDateFieldName = deliveryDateFieldName;
    this.capacityFieldName = capacityFieldName;
  }

  @Override
  public FunctionValues getValues(Map context, LeafReaderContext readerContext) throws IOException {
    return new FunctionValues() {
      @Override
      public byte byteVal(int doc) throws IOException {
        return (byte) intVal(doc);
      }

      @Override
      public short shortVal(int doc) throws IOException {
        return (short) intVal(doc);
      }

      @Override
      public float floatVal(int doc) throws IOException {
        return (float) intVal(doc);
      }

      @Override
      public int intVal(int doc) throws IOException {
        return hasMonthlyCapacity(doc, readerContext);
      }

      @Override
      public long longVal(int doc) throws IOException {
        return (long) intVal(doc);
      }

      @Override
      public double doubleVal(int doc) throws IOException {
        return (double) intVal(doc);
      }

      @Override
      public String strVal(int doc) throws IOException {
        return Integer.toString(intVal(doc));
      }

      @Override
      public Object objectVal(int doc) throws IOException {
        return intVal(doc);
      }

      @Override
      public String toString(int doc) throws IOException {
        return Integer.toString(intVal(doc));
      }
    };
  }

  /**
   * The Core of the hasMonthlyCapacity calculation.
   * 
   * @param docId         id of the document
   * @param readerContext the context of the reader, to be able to get the field
   *                      values
   * @return boolean value. 0 for no-capacity und 1 if the midwife has capacity
   *         for a new care
   * @throws IOException
   */
  private int hasMonthlyCapacity(int docId, LeafReaderContext readerContext)
      throws IOException {
    // NOTE: to debug use throw !!
    // throw new SolrException(SolrException.ErrorCode.BAD_REQUEST, "YOUR DEBUG
    // STRING TO BE RETURNED TO USER");
    Set<String> usedFieldsSet = Set.of(this.deliveryDateFieldName, this.capacityFieldName);
    Document document = readerContext.reader().document(docId, usedFieldsSet);
    String strCapacity = document.get(this.capacityFieldName);
    if (strCapacity == null)
      return 0;
    Integer capacity = Integer.parseInt(strCapacity);
    if (capacity == 0)
      return 0;

    Utils utils = new Utils();
    Date monthBegin = utils.getMonthBegin(this.expectedDeliveryDate);
    Date monthEnd = utils.getMonthEnd(this.expectedDeliveryDate);
    String[] delivertyDates = document.getValues(this.deliveryDateFieldName);
    Integer caresInTargetMonth = 0;
    for (String delivertyDateItem : delivertyDates) {
      Date deliveryDate = DateMathParser.parseMath(null, delivertyDateItem);
      if (!(deliveryDate.before(monthBegin) || deliveryDate.after(monthEnd)))
        caresInTargetMonth++;
    }
    return caresInTargetMonth < capacity ? 1 : 0;
  }

  @Override
  public boolean equals(Object o) {
    if (o instanceof HasMonthlyCapacityValueSource) {
      HasMonthlyCapacityValueSource obj = (HasMonthlyCapacityValueSource) o;
      return obj.expectedDeliveryDate.equals(this.expectedDeliveryDate)
          && obj.capacityFieldName.equals(this.capacityFieldName)
          && obj.deliveryDateFieldName.equals(this.deliveryDateFieldName);
    }
    return false;
  }

  @Override
  public int hashCode() {
    return this.expectedDeliveryDate.hashCode() + this.capacityFieldName.hashCode()
        + this.deliveryDateFieldName.hashCode();
  }

  @Override
  public String description() {
    return "checking if midwife has capacity in selected month";
  }
}
