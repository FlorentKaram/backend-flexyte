import { Test, TestingModule } from '@nestjs/testing';
import { RestaurantService } from '../services/restaurant.service';
import { TemplateDataGateway } from 'src/extentions/templates/interface/templates.interface';
import { TemplatesService } from 'src/extentions/templates/templates.service';
import { SirenDataGateway } from '../interface/siren.interface';
import { HttpException, NotFoundException } from '@nestjs/common';
import { RestaurantMock } from './restaurant.mock';
import { RestaurantDataGateway } from '../interface/restaurant.interface';
import { CreateRestaurantDto } from '../dto/createRestaurant.dto';

describe('RestaurantService', () => {
    let service: RestaurantService;
    let restaurantDataGataway: RestaurantDataGateway;
    let templateDataGateway: TemplateDataGateway;
    let templatesService: TemplatesService;
    let sirenDataGateway: SirenDataGateway;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                RestaurantService,
                {
                    provide: RestaurantDataGateway,
                    useValue: {
                        getRestaurantByCompanyName: jest.fn(),
                        getRestaurantByEmail: jest.fn(),
                        createRestaurant: jest.fn(),
                        createAndSaveRestaurant: jest.fn(),
                        createFirstRestaurant: jest.fn(),
                        updateRestaurant: jest.fn(),
                        deleteRestaurantByEmail: jest.fn(),
                        saveRestaurant: jest.fn(),
                    },
                },
                {
                    provide: TemplateDataGateway,
                    useValue: {
                        deleteTemplate: jest.fn(),
                    },
                },
                {
                    provide: TemplatesService,
                    useValue: {
                        initRestaurantTemplate: jest.fn(),
                    },
                },
                {
                    provide: SirenDataGateway,
                    useValue: {
                        checkSiren: jest.fn(),
                    },
                },
            ],
        }).compile();

        service = module.get<RestaurantService>(RestaurantService);
        restaurantDataGataway = module.get<RestaurantDataGateway>(RestaurantDataGateway);
        templateDataGateway = module.get<TemplateDataGateway>(TemplateDataGateway);
        templatesService = module.get<TemplatesService>(TemplatesService);
        sirenDataGateway = module.get<SirenDataGateway>(SirenDataGateway);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('create', () => {
        it('should throw an error if siren is invalid', async () => {
            (sirenDataGateway.checkSiren as jest.Mock).mockResolvedValue(false);

            const createUserDto: CreateRestaurantDto = RestaurantMock.mockedCreateRestaurantDto;

            await expect(service.create(createUserDto)).rejects.toThrow(HttpException);
            await expect(service.create(createUserDto)).rejects.toThrow('Invalid siren');
        });

        it('should create a new restaurant if siren is valid', async () => {
            (sirenDataGateway.checkSiren as jest.Mock).mockResolvedValue(true);
            (restaurantDataGataway.createRestaurant as jest.Mock).mockReturnValue(RestaurantMock.mockedCreateRestaurantDto);
            (restaurantDataGataway.saveRestaurant as jest.Mock).mockResolvedValue(RestaurantMock.mockedCreateRestaurantDto);

            const createUserDto: CreateRestaurantDto = RestaurantMock.mockedCreateRestaurantDto;

            const result = await service.create(createUserDto);
            expect(result).toBeDefined();
            expect(result.email).toEqual(createUserDto.email);
        });
    });

    describe('findOneByEmail', () => {
        it('should return a restaurant if found', async () => {
            (restaurantDataGataway.getRestaurantByEmail as jest.Mock).mockResolvedValue(RestaurantMock.mockedRestaurant);


            const result = await service.findOneByEmail('test@test.com');
            expect(result).toBe(RestaurantMock.mockedRestaurant);
        });

        it('should throw NotFoundException if restaurant not found', async () => {
            (restaurantDataGataway.getRestaurantByCompanyName as jest.Mock).mockResolvedValue(null);

            await expect(service.findOneByEmail('test@test.com')).rejects.toThrow(NotFoundException);
        });
    });

    describe('update', () => {
        it('should throw NotFoundException if restaurant not found', async () => {
            (restaurantDataGataway.getRestaurantByCompanyName as jest.Mock).mockResolvedValue(null);

            await expect(service.update('test@test.com', 'Test Company', RestaurantMock.mockedUpdateRestaurantDto)).rejects.toThrow(NotFoundException);
        });
    });

    describe('updatePassword', () => {
        it('should update restaurant password', async () => {
            (restaurantDataGataway.getRestaurantByEmail as jest.Mock).mockResolvedValue(RestaurantMock.mockedRestaurant);
            (restaurantDataGataway.saveRestaurant as jest.Mock).mockResolvedValue(RestaurantMock.mockedRestaurant);

            const result = await service.updatePassword('test@test.com', { password: 'newpassword' });
            expect(result.password).toBe('');
        });

        it('should throw NotFoundException if restaurant not found', async () => {
            (restaurantDataGataway.getRestaurantByCompanyName as jest.Mock).mockResolvedValue(null);

            await expect(service.updatePassword('test@test.com', { password: 'newpassword' })).rejects.toThrow(NotFoundException);
        });
    });

    describe('remove', () => {
        it('should remove a restaurant', async () => {
            (restaurantDataGataway.getRestaurantByCompanyName as jest.Mock).mockResolvedValue(RestaurantMock.mockedRestaurant);
            (restaurantDataGataway.deleteRestaurantByEmail as jest.Mock).mockResolvedValue(RestaurantMock.mockedRestaurant);
            (templateDataGateway.deleteTemplate as jest.Mock).mockResolvedValue(true);

            const result = await service.remove('test@test.com');
            expect(result).toBe(RestaurantMock.mockedRestaurant);
        });

        it('should throw NotFoundException if restaurant not found', async () => {
            (restaurantDataGataway.getRestaurantByCompanyName as jest.Mock).mockResolvedValue(null);

            await expect(service.remove('test@test.com')).rejects.toThrow(NotFoundException);
        });
    });

    describe('createFirstRestaurant', () => {
        it('should create the root restaurant if it does not exist', async () => {
            (restaurantDataGataway.createFirstRestaurant as jest.Mock).mockResolvedValue(RestaurantMock.mockedRestaurant);

            await expect(service.createFirstRestaurant()).resolves.not.toThrow();
            expect(restaurantDataGataway.createFirstRestaurant).toHaveBeenCalled();
        });
    });

    describe('emailAlreadyExist', () => {
        it('should throw HttpException if email already exists', async () => {
            (restaurantDataGataway.getRestaurantByEmail as jest.Mock).mockResolvedValue(RestaurantMock.mockedRestaurant);

            await expect(service.emailAlreadyExist('test@test.com')).rejects.toThrow(HttpException);
            await expect(service.emailAlreadyExist('test@test.com')).rejects.toThrow('Restaurant already exist');
        });

        it('should not throw if email does not exist', async () => {
            (restaurantDataGataway.getRestaurantByCompanyName as jest.Mock).mockResolvedValue(null);

            await expect(service.emailAlreadyExist('test@test.com')).resolves.not.toThrow();
        });
    });

    describe('nameAlreadyExist', () => {
        it('should throw HttpException if company name already exists', async () => {
            (restaurantDataGataway.getRestaurantByEmail as jest.Mock).mockResolvedValue(RestaurantMock.mockedRestaurant);

            await expect(service.nameAlreadyExist('Test Company')).rejects.toThrow(HttpException);
            await expect(service.nameAlreadyExist('Test Company')).rejects.toThrow('Company name already exist');
        });

        it('should not throw if company name does not exist', async () => {
            (restaurantDataGataway.getRestaurantByCompanyName as jest.Mock).mockResolvedValue(null);

            await expect(service.nameAlreadyExist('Test Company')).resolves.not.toThrow();
        });
    });

    describe('hashData', () => {
        it('should hash data', async () => {
            const data = 'password';
            const hashedData = service.hashData(data);
            expect(hashedData).not.toBe(data);
        });
    });
});
