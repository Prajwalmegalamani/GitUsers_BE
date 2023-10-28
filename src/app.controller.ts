import { Body, Controller, Get, Param, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('/api/')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('searchUsers')
  searchUsers(
    @Query('searchText') searchText: string,
    @Query('currentPage') currentPage: number,
    @Query('perPage') perPage: number,
  ) {
    if (searchText && currentPage && perPage) {
      return this.appService.getSearchUsers(searchText, currentPage, perPage);
    } else {
      return 'searchText, currentPage and perPage are required';
    }
  }

  @Get('randomUsers')
  randomUsers(
    @Query('currentPage') currentPage: number,
    @Query('perPage') perPage: number,
  ) {
    if (currentPage && perPage) {
      return this.appService.getRandomUsers(currentPage, perPage);
    } else {
      return 'currentPage and perPage are required';
    }
  }
}
