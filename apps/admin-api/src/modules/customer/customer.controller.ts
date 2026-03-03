import { Controller, Delete, Get, Param } from '@nestjs/common'
import { User } from '@sift-shop/database'

import { CustomerService } from './customer.service'

@Controller('customers')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Get()
  async getCustomers(): Promise<User[]> {
    return this.customerService.getCustomers()
  }

  @Delete(':id')
  async deleteCustomer(@Param('id') id: string): Promise<void> {
    return this.customerService.deleteCustomer(id)
  }
}
