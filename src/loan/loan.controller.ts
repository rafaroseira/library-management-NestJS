import { Body, Controller, HttpStatus, Param, ParseIntPipe, Post, Put, Request, UseGuards, ValidationPipe } from '@nestjs/common';
import { LoanService } from './loan.service';
import { CreateLoanDTO } from './dto/create-loan.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';

@Controller('loan') 
export class LoanController {
  constructor(private readonly loanService: LoanService) {}

  @UseGuards(JwtAuthGuard)
  @Post("/new")
  async create(@Body(ValidationPipe) createLoanDTO: CreateLoanDTO, @Request() req) {
    const loan = await this.loanService.create(createLoanDTO, req.user.userId);

    return {
      statusCode: HttpStatus.CREATED,
      message: `Loan created successfully. Due date: ${loan.dueDate.toISOString().split('T')[0]}`
    };
  }

  @UseGuards(JwtAuthGuard)
  @Put('/close/:id')
  async close(@Param('id', ParseIntPipe) id: number) {
    await this.loanService.close(id);
    
    return {
      statusCode: HttpStatus.OK,
      message: 'Loan closed successfully'
    };
  }
}