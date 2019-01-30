import React from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Table,
  Row,
  Col
} from "reactstrap";

// import { thead, tbody } from "./voucherData";
import axios from "axios";

class VoucherTable extends React.Component {
  state = {
    voucher: [],
    isLoading: false,
    error: null
  };
  componentDidMount() {
    axios
      .get("https://172.20.20.23:5001/list/SHOPRITE-PROMO?Merchant=Enunwah", {
        responseType: "json"
      })
      .then(response => {
        const newUser = response.data;
        let voucherDataArr = Object.keys(newUser).reduce((arr, e) => {
          arr.push(newUser[e]);
          return arr;
        }, []);
        this.setState({
          voucher: voucherDataArr,
          isLoading: false
        });
      })
      .catch(error =>
        this.setState({
          error,
          isLoading: false
        })
      );
  }
  render() {
    return (
      <div className="content">
        <Row>
          <Col xs={12}>
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Voucher Table</CardTitle>
              </CardHeader>
              <CardBody>
                <p>*RS: Redemption Status</p>
                {!this.state.isLoading ? (
                  <Table responsive>
                    <thead className="text-primary">
                      <tr>
                        <th className="text-left">Voucher-Code</th>
                        <th className="text-left">Campaign-Name</th>
                        <th className="text-left">Type</th>
                        <th className="text-left">Value</th>
                        <th className="text-left">Status</th>
                        <th className="text-left">Date-Created</th>
                        <th className="text-left">Expiry-Date</th>
                        <th className="text-left">R.S</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.voucher.map(item => (
                        <tr key={item.voucherCode}>
                          <td>{item.voucherCode}</td>
                          <td>{item.campaignName}</td>
                          <td>{item.type}</td>
                          <td>{item.value}</td>
                          <td>{item.status}</td>
                          <td>{item.dateCreated}</td>
                          <td>{item.expiryDate}</td>
                          <td>{item.redemptionStatus}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                ) : (
                  <h4>Loading data...</h4>
                )}
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default VoucherTable;