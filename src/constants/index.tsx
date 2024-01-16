import { AuditOutlined, ShopOutlined, TeamOutlined } from "@ant-design/icons";

const IconWrapper = ({
  color,
  children,
}: React.PropsWithChildren<{ color: string }>) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "32px",
        height: "32px",
        borderRadius: "50%",
        backgroundColor: color,
      }}
    >
      {children}
    </div>
  );
};

import {
  BusinessType,
  CompanySize,
  Contact,
  Industry,
} from "@/graphql/schema.types";

export type TotalCountType = "companies" | "contacts" | "deals";

export const totalCountVariants: {
  [key in TotalCountType]: {
    primaryColor: string;
    secondaryColor?: string;
    icon: React.ReactNode;
    title: string;
    data: { index: string; value: number }[];
  };
} = {
  companies: {
    primaryColor: "#1677FF",
    secondaryColor: "#BAE0FF",
    icon: (
      <IconWrapper color="#E6F4FF">
        <ShopOutlined
          className="md"
          style={{
            color: "#1677FF",
          }}
        />
      </IconWrapper>
    ),
    title: "Number of companies",
    data: [
      {
        index: "1",
        value: 3500,
      },
      {
        index: "2",
        value: 2750,
      },
      {
        index: "3",
        value: 5000,
      },
      {
        index: "4",
        value: 4250,
      },
      {
        index: "5",
        value: 5000,
      },
    ],
  },
  contacts: {
    primaryColor: "#52C41A",
    secondaryColor: "#D9F7BE",
    icon: (
      <IconWrapper color="#F6FFED">
        <TeamOutlined
          className="md"
          style={{
            color: "#52C41A",
          }}
        />
      </IconWrapper>
    ),
    title: "Number of contacts",
    data: [
      {
        index: "1",
        value: 10000,
      },
      {
        index: "2",
        value: 19500,
      },
      {
        index: "3",
        value: 13000,
      },
      {
        index: "4",
        value: 17000,
      },
      {
        index: "5",
        value: 13000,
      },
      {
        index: "6",
        value: 20000,
      },
    ],
  },
  deals: {
    primaryColor: "#FA541C",
    secondaryColor: "#FFD8BF",
    icon: (
      <IconWrapper color="#FFF2E8">
        <AuditOutlined
          className="md"
          style={{
            color: "#FA541C",
          }}
        />
      </IconWrapper>
    ),
    title: "Total deals in pipeline",
    data: [
      {
        index: "1",
        value: 1000,
      },
      {
        index: "2",
        value: 1300,
      },
      {
        index: "3",
        value: 1200,
      },
      {
        index: "4",
        value: 2000,
      },
      {
        index: "5",
        value: 800,
      },
      {
        index: "6",
        value: 1700,
      },
      {
        index: "7",
        value: 1400,
      },
      {
        index: "8",
        value: 1800,
      },
    ],
  },
};

export const statusOptions: {
  label: string;
  value: Contact["status"];
}[] = [
  {
    label: "New",
    value: "NEW",
  },
  {
    label: "Qualified",
    value: "QUALIFIED",
  },
  {
    label: "Unqualified",
    value: "UNQUALIFIED",
  },
  {
    label: "Won",
    value: "WON",
  },
  {
    label: "Negotiation",
    value: "NEGOTIATION",
  },
  {
    label: "Lost",
    value: "LOST",
  },
  {
    label: "Interested",
    value: "INTERESTED",
  },
  {
    label: "Contacted",
    value: "CONTACTED",
  },
  {
    label: "Churned",
    value: "CHURNED",
  },
];

export const companySizeOptions: {
  label: string;
  value: CompanySize;
}[] = [
  {
    label: "Enterprise",
    value: "ENTERPRISE",
  },
  {
    label: "Large",
    value: "LARGE",
  },
  {
    label: "Medium",
    value: "MEDIUM",
  },
  {
    label: "Small",
    value: "SMALL",
  },
];

export const industryOptions: {
  label: string;
  value: Industry;
}[] = [
  { label: "Aerospace", value: "AEROSPACE" },
  { label: "Agriculture", value: "AGRICULTURE" },
  { label: "Automotive", value: "AUTOMOTIVE" },
  { label: "Chemicals", value: "CHEMICALS" },
  { label: "Construction", value: "CONSTRUCTION" },
  { label: "Defense", value: "DEFENSE" },
  { label: "Education", value: "EDUCATION" },
  { label: "Energy", value: "ENERGY" },
  { label: "Financial Services", value: "FINANCIAL_SERVICES" },
  { label: "Food and Beverage", value: "FOOD_AND_BEVERAGE" },
  { label: "Government", value: "GOVERNMENT" },
  { label: "Healthcare", value: "HEALTHCARE" },
  { label: "Hospitality", value: "HOSPITALITY" },
  { label: "Industrial Manufacturing", value: "INDUSTRIAL_MANUFACTURING" },
  { label: "Insurance", value: "INSURANCE" },
  { label: "Life Sciences", value: "LIFE_SCIENCES" },
  { label: "Logistics", value: "LOGISTICS" },
  { label: "Media", value: "MEDIA" },
  { label: "Mining", value: "MINING" },
  { label: "Nonprofit", value: "NONPROFIT" },
  { label: "Other", value: "OTHER" },
  { label: "Pharmaceuticals", value: "PHARMACEUTICALS" },
  { label: "Professional Services", value: "PROFESSIONAL_SERVICES" },
  { label: "Real Estate", value: "REAL_ESTATE" },
  { label: "Retail", value: "RETAIL" },
  { label: "Technology", value: "TECHNOLOGY" },
  { label: "Telecommunications", value: "TELECOMMUNICATIONS" },
  { label: "Transportation", value: "TRANSPORTATION" },
  { label: "Utilities", value: "UTILITIES" },
];

export const businessTypeOptions: {
  label: string;
  value: BusinessType;
}[] = [
  {
    label: "B2B",
    value: "B2B",
  },
  {
    label: "B2C",
    value: "B2C",
  },
  {
    label: "B2G",
    value: "B2G",
  },
];
