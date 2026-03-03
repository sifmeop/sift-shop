import { HttpException, Injectable } from '@nestjs/common'
import { prisma, User, UserRole } from '@sift-shop/database'

@Injectable()
export class CustomerService {
  async getCustomers(): Promise<User[]> {
    const customers = await prisma.user.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    })

    return customers
  }

  async deleteCustomer(id: string): Promise<void> {
    const customer = await prisma.user.findUnique({
      where: {
        id
      }
    })

    if (!customer || customer.role !== UserRole.CUSTOMER) {
      throw new HttpException('Customer not found', 404)
    }

    await prisma.user.delete({
      where: {
        id
      }
    })
  }
}
