import * as React from "react";
import { Avatar, Button, Card, Text } from "react-native-paper";
import TicketService from "../services/TicketService";
import { Empty } from "antd";

const LeftContent = (props) => <Avatar.Icon {...props} icon="ticket" />;

const TicketCard = ({ item, setTickets, tickets }) => {
  const ticketService = new TicketService();

  const removeTicket = async (ticketId) => {
    const response = await ticketService.removeTicket(ticketId);
    console.log(response);
    if (setTickets) {
      setTickets(tickets.filter((ticket) => ticket.id !== ticketId));
    }
  };

  return (
    <Card style={{ marginBottom: "5%" }}>
      <Card.Title
        title={item.title}
        subtitle={<Text>Ticket id: {item.id}</Text>}
        left={LeftContent}
      />
      <Card.Content>
        <Text variant="titleLarge">{item.content}</Text>
        <Text variant="bodyMedium">Ticket status: {item.status}</Text>
        <Text variant="bodyMedium">
          Admin comment{" "}
          {item.admin_comment
            ? item.admin_comment
            : "comments made by admin will be visible here"}
        </Text>
      </Card.Content>
      {/* <Card.Cover source={{ uri: 'https://picsum.photos/700' }} /> */}
      <Card.Actions>
        <Button
          onPress={() => {
            removeTicket(item.id);
          }}
        >
          Delete Ticket
        </Button>
      </Card.Actions>
    </Card>
  );
};

export default TicketCard;
