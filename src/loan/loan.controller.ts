import { Body, Controller, HttpStatus, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { LoanService } from './loan.service';
import { CreateLoanDTO } from './dto/create-loan.dto';

@Controller('loan') 
export class LoanController {
  constructor(private readonly loanService: LoanService) {}

  @Post("/new")
  async create(@Body() createLoanDTO: CreateLoanDTO) {
    const loan = await this.loanService.create(createLoanDTO);

    return {
      statusCode: HttpStatus.CREATED,
      message: `Loan created successfully. Due date: ${loan.dueDate.toISOString().split('T')[0]}`
    };
  }

  @Put('/close/:id')
  async close(@Param('id', ParseIntPipe) id: number) {
    await this.loanService.close(id);
    
    return {
      statusCode: HttpStatus.OK,
      message: 'Loan closed successfully'
    };
  }
}