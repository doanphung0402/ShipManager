import React from "react";
import { DatePicker } from "antd";
import moment from "moment";

export default function RangePicker({ size = "large", onChange }) {
  return (
    <DatePicker.RangePicker
      size={size}
      format="DD/MM/YYYY"
      allowClear={false}
      disabledDate={(current) => current && current < moment().startOf("month")}
      ranges={{
        "Hôm nay": [moment(), moment()],
        "Tuần này": [moment().startOf("week"), moment().endOf("week")],
        "Tháng này": [moment().startOf("month"), moment().endOf("month")],
      }}
      defaultValue={[moment().startOf("week"), moment().endOf("week")]}
      onChange={onChange}
    />
  );
}
