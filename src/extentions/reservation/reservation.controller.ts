import { Controller, Post, UseGuards, Request, Body, Get, Param, Delete} from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { ReservationService } from "./reservation.service";
import { AccessTokenGuard } from "src/guards/access-token.guard";
import { ReservationDto } from "./dto/reservation.dto";

@ApiTags('Reservation')
@Controller('reservation')
export class ReservationController {
    constructor(private readonly reservationService: ReservationService ) { }

    // Create a reservation
    @ApiOperation({ summary: 'Create a reservation' })
    @Post()
    async createReservation(@Body() reservation: ReservationDto) {
        return this.reservationService.createReservation(reservation);
    }

    // Get all reservations
    @UseGuards(AccessTokenGuard)
    @ApiBearerAuth('acces-token')
    @ApiOperation({ summary: 'Get all reservations' })
    @Get()
    async getAllReservations(@Request() req) {
        return this.reservationService.getAllReservations(req.user.companyName);
    }

    // Get all reservations by date
    @UseGuards(AccessTokenGuard)
    @ApiBearerAuth('acces-token')
    @ApiOperation({ summary: 'Get all reservations by date' })
    @Get('date/:date')
    async getAllReservationsByDate(@Request() req, @Param() date: string) {
        return this.reservationService.getAllReservationBydate(req.user.companyName, date);
    }

    // Delete a reservation
    @UseGuards(AccessTokenGuard)
    @ApiBearerAuth('acces-token')
    @ApiOperation({ summary: 'Delete a reservation' })
    @Delete(':email')
    async deleteReservation(@Request() req, @Param('email') email: string) {
        return this.reservationService.deleteReservation(req.user.companyName, email);
    }

    // Validate a reservation
    @UseGuards(AccessTokenGuard)
    @ApiBearerAuth('acces-token')
    @ApiOperation({ summary: 'Validate a reservation' })
    @Post(':email')
    async validateReservation(@Request() req, @Param('email') email: string) {
        return this.reservationService.validateReservation(req.user.companyName, email);
    }

}