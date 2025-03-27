import Grid from "@mui/material/Grid2";
import { useEffect, useState } from "react";
import { IMeta } from "../services/types/ProductInterface.tsx";
import StatCardSummary from "../pages/admin/components/home/card/StatCardSummary.tsx";
import { IOrderSummary } from "../services/types/OrderInterface.tsx";

export interface IConsumeDataGrid {
  title: string;
  value: string;
  interval: string;
  trend: "up" | "down" | "neutral";
  data: Array<number>;
}

export interface IConsumeData {
  meta: IMeta;
  orderSummary: IOrderSummary;
}

const ConsumeData = (props: IConsumeData) => {
  const [consumeData, setConsumeData] = useState<IConsumeDataGrid[]>([]);

  useEffect(() => {
    setConsumeData([]);
    if (props.meta) {
      const mockData: Array<IConsumeDataGrid> = [
        {
          title: "Total items",
          value: `${props.meta.totalItems}`,
          interval: "",
          trend: "neutral",
          data: [],
        },
      ];
      setConsumeData(mockData);
    }

    if (props.orderSummary) {
      const mockSummary: Array<IConsumeDataGrid> = [
        {
          title: "Total order amount",
          value: `$ ${Number(props.orderSummary.orderAmount.subtotal).toLocaleString("en-US", { minimumFractionDigits: 2 })}`,
          interval: "",
          trend: "neutral",
          data: [],
        },
        {
          title: "Revenue",
          value: `$ ${Number(props.orderSummary.revenue.total).toLocaleString("en-US", { minimumFractionDigits: 2 })}`,
          interval: "",
          trend: "neutral",
          data: [],
        },
      ];
      for (const sta of props.orderSummary.status) {
        if (["RETURN"].indexOf(sta.status) > -1) {
          mockSummary.push({
            title: sta.status.toLocaleUpperCase(),
            value: `${Number(sta.count)}`,
            interval: "",
            trend: "neutral",
            data: [],
          });
        }
      }
      setConsumeData((prev) => [...prev, ...mockSummary]);
    }
  }, [props.meta, props.orderSummary]);

  return (
    <Grid
      container
      spacing={2}
      columns={12}
      sx={{ mb: (theme) => theme.spacing(2) }}
    >
      {consumeData.map((card, index) => (
        <Grid key={index} size={{ xs: 12, sm: 6, lg: 3 }}>
          <StatCardSummary {...card} />
        </Grid>
      ))}
    </Grid>
  );
};

export default ConsumeData;
