import { BaseRepository } from "@app/helpers/database/repository";
import { CustomerDocument, CustomerModel } from "./models/customer.model";
import { injectable } from "inversify";

@injectable()
export class CustomerService extends BaseRepository<CustomerDocument> {
  constructor() {
    super(CustomerModel);
  }
}