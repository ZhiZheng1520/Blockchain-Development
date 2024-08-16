import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface TableEvent {
  fromOrganisationName: string;
  fromRegistrationId: string;
  toOrganisationName: string;
  toRegistrationId: string;
  numberOfToken: string;
  timestamp: string;
}

interface TransactionsTableProps {
  transactions: TableEvent[];
}

export function TransactionsTable({
  transactions = [],
}: TransactionsTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>From Organisation</TableHead>
          <TableHead>From Registration ID</TableHead>
          <TableHead>To Organisation</TableHead>
          <TableHead>To Registration ID</TableHead>
          <TableHead>Number of Tokens (CNX)</TableHead>
          <TableHead>Transaction Date Time</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {Array.isArray(transactions) &&
          transactions.map((transaction) => (
            <TableRow>
              <TableCell>{transaction.fromOrganisationName}</TableCell>
              <TableCell>{transaction.fromRegistrationId}</TableCell>
              <TableCell>{transaction.toOrganisationName}</TableCell>
              <TableCell>{transaction.toRegistrationId}</TableCell>
              <TableCell>{transaction.numberOfToken}</TableCell>
              <TableCell>
                {new Date(transaction.timestamp).toLocaleString("en-GB", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                  hour12: false,
                })}
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
}
