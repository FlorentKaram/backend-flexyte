import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiProperty, ApiTags } from "@nestjs/swagger";
import { AccessTokenGuard } from "src/guards/access-token.guard";
import { Reservation, ReservationDocument } from "./reservation.model";
import { ReservationService } from "./reservation.service";

@ApiTags('Reservation API')
@Controller('reservation')
export class ReservationController {
    constructor(private readonly ReservationService: ReservationService) { }

    @ApiOperation({ summary: 'Reserve a table' })
    @Post()
    async reserve(@Body() reservation: Reservation) {
        return this.ReservationService.reserve(reservation);
    }

    @UseGuards(AccessTokenGuard)
    @ApiBearerAuth('acces-token')
    @ApiOperation({ summary: 'Accept a reservation' })
    @Patch(':email/valid')
    async reservationValid(@Param('email') email: string) {
        return this.ReservationService.reservationValid(email);
    }

    @UseGuards(AccessTokenGuard)
    @ApiBearerAuth('acces-token')
    @ApiOperation({ summary: 'Reject a reservation' })
    @Patch(':email/invalid')
    async reservationInvalid(@Param('email') email: string) {
        return this.ReservationService.reservationInvalid(email);
    }

    @UseGuards(AccessTokenGuard)
    @ApiBearerAuth('acces-token')
    @ApiOperation({ summary: 'Delete a reservation' })
    @Delete(':email/delete')
    async deleteReservation(@Param('email') email: string) {
        return this.ReservationService.deleteReservation(email);
    }

    @ApiOperation({ summary: 'Get all reservations' })
    @Get()
    async getAllReservations() {
        return this.ReservationService.getAllReservations();
    }

    @ApiOperation({ summary: 'Get all reservations by year' })
    @Get(':year')
    async getAllReservationsYear(@Param('year') year: number) {
        return this.ReservationService.getByYear(year);
    }

    @ApiOperation({ summary: 'Get all reservations by year and month' })
    @Get(':year/:month')
    async getAllReservationsMonth(@Param('year') year: number, @Param('month') month: number) {
        return this.ReservationService.getByMonth(year, month);
    }

    @ApiOperation({ summary: 'Get all reservations by year, month and day' })
    @Get(':year/:month/:day')
    async getAllReservationsDay(@Param('year') year: number, @Param('month') month: number, @Param('day') day: number) {
        return this.ReservationService.getByDay(year, month, day);
    }

    @ApiOperation({ summary: 'Get all reservations of today' })
    @Get('today')
    async getAllReservationsToday() {
        return this.ReservationService.getTodayReservations();
    }
}