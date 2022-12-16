package com.aidminutes.hedi;

import java.io.IOException;
import java.util.Date;
import java.util.Map;
import java.time.temporal.ChronoUnit;

import org.apache.lucene.document.Document;
import org.apache.lucene.index.LeafReaderContext;
import org.apache.lucene.queries.function.FunctionValues;
import org.apache.lucene.queries.function.ValueSource;
import org.apache.solr.util.DateMathParser;

public class IntersectRatioValueSource extends ValueSource {

  private Date startDate;
  private Date endDate;
  private String dateRangeFieldName;
  private long searchRangeDurationInMinutes;

  public IntersectRatioValueSource(Date startDate, Date endDate, String dateRangeFieldName) {
    this.startDate = startDate;
    this.endDate = endDate;
    this.dateRangeFieldName = dateRangeFieldName;
    this.searchRangeDurationInMinutes = ChronoUnit.MINUTES.between(startDate.toInstant(), endDate.toInstant());
  }

  @Override
  public FunctionValues getValues(Map context, LeafReaderContext readerContext) throws IOException {
    return new FunctionValues() {
      @Override
      public byte byteVal(int doc) throws IOException {
        return (byte) doubleVal(doc);
      }

      @Override
      public short shortVal(int doc) throws IOException {
        return (short) doubleVal(doc);
      }

      @Override
      public float floatVal(int doc) throws IOException {
        return (float) doubleVal(doc);
      }

      @Override
      public int intVal(int doc) throws IOException {
        return (int) doubleVal(doc);
      }

      @Override
      public long longVal(int doc) throws IOException {
        return (long) doubleVal(doc);
      }

      @Override
      public double doubleVal(int doc) throws IOException {
        return getIntersectRatio(doc, readerContext);
      }

      @Override
      public String strVal(int doc) throws IOException {
        return Double.toString(doubleVal(doc));
      }

      @Override
      public Object objectVal(int doc) throws IOException {
        return doubleVal(doc);
      }

      @Override
      public String toString(int doc) throws IOException {
        return Double.toString(doubleVal(doc));
      }
    };
  }

  /**
   * The Core of the intersectRatio calculation.
   * 
   * @param docId         id of the document
   * @param readerContext the context of the reader, to be able to get the field
   *                      values
   * @return a double value between 0 and 1: shows INTERSECTED_MINUTES /
   *         TOTAL_MINUTES_IN_SEARCH_RANGE
   */
  private double getIntersectRatio(int docId, LeafReaderContext readerContext) throws IOException {
    if (this.searchRangeDurationInMinutes == 0)
      return 0;
    Document document = readerContext.reader().document(docId);
    // NOTE: dateranges are stored as string [DATE1 TO DATE2]
    String[] ranges = document.getValues(this.dateRangeFieldName);
    long totalIntersectedMinutes = 0;
    for (int i = 0; i < ranges.length; i++) {
      if (ranges[i].length() <= 8)
        continue;
      String[] dateStrings = ranges[i].substring(1, ranges[i].length() - 1).split(" TO ");
      if (dateStrings.length != 2)
        continue;
      Date itemRangeStart = DateMathParser.parseMath(null, dateStrings[0]);
      Date itemRangeEnd = DateMathParser.parseMath(null, dateStrings[1]);
      if (itemRangeStart.after(this.endDate) || itemRangeEnd.before(this.startDate))
        continue;
      Date intersectStart = itemRangeStart.after(this.startDate) ? itemRangeStart : this.startDate;
      Date intersectEnd = itemRangeEnd.before(this.endDate) ? itemRangeEnd : this.endDate;
      totalIntersectedMinutes += ChronoUnit.MINUTES.between(intersectStart.toInstant(), intersectEnd.toInstant());
    }
    return (double) (totalIntersectedMinutes / (double) this.searchRangeDurationInMinutes);
  }

  @Override
  public boolean equals(Object o) {
    if (o instanceof IntersectRatioValueSource) {
      IntersectRatioValueSource obj = (IntersectRatioValueSource) o;
      return obj.startDate.equals(this.startDate) && obj.endDate.equals(this.endDate)
          && obj.dateRangeFieldName.equals(this.dateRangeFieldName);
    }
    return false;
  }

  @Override
  public int hashCode() {
    return this.startDate.hashCode() + this.endDate.hashCode() + this.dateRangeFieldName.hashCode();
  }

  @Override
  public String description() {
    return "calculating intersectRatio (0..1)";
  }

}
