const mockDayDto = {
    openLunchHours: "12",
    openLunchMinutes: "00",
    closeLunchHours: "14",
    closeLunchMinutes: "00",
    openDinnerHours: "19",
    openDinnerMinutes: "00",
    closeDinnerHours: "22",
    closeDinnerMinutes: "00"
};

const mockrestaurantReservationDto = {
    monday: mockDayDto,
    tuesday: mockDayDto,
    wednesday: mockDayDto,
    thursday: mockDayDto,
    friday: mockDayDto,
    saturday: mockDayDto,
    sunday: mockDayDto
};

export const TemplateMock = {
    mockedDay: mockDayDto,

    mockedrestaurantReservation: mockrestaurantReservationDto,
    
    mockedTemplate: {
        templateNumber: 1,
        description: "description",
        facebook: "facebook",
        instagram: "instagram",
        linkedin: "linkedin",
        twitter: "twitter",
        adress: "adress",
        postalNumber: "postalNumber",
        city: "city",
        image: "image",
        reservation: mockrestaurantReservationDto
    }
};