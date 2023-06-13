import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';

import { User } from '@backend/entities';

import { UsersService } from './users.service';


describe('UsersService', () => {
  let service: UsersService;

  const mockFindByOne = jest.fn();
  const mockCreate = jest.fn();
  const mockSave = jest.fn();

  beforeEach(async () => {
    const app = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            findOneBy: mockFindByOne,
            create: mockCreate,
            save: mockSave
          }
        }
      ],
    }).compile();

    service = app.get<UsersService>(UsersService);

    jest.resetAllMocks();
  });

  describe('findByEmail', () => {
    it('should throw NotFoundException if there is no user with provided email', () => {
      mockFindByOne.mockReturnValue(null);
      try {
        service.findByEmail('test@email.com');
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException)
        expect(error.message).toBe('User not found')
      }
    });

    it('should return a founded user', () => {
      mockFindByOne.mockReturnValue({ email: 'test@email.com' });

      expect(service.findByEmail('test@email.com')).toEqual({ email: 'test@email.com' })
    });
  });

  describe('findById', () => {
    it('should throw NotFoundException if there is no user with provided id', () => {
      mockFindByOne.mockReturnValue(null);
      try {
        service.findById('testId');
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException)
        expect(error.message).toBe('User not found')
      }
    });

    it('should return a founded user', () => {
      mockFindByOne.mockReturnValue({ email: 'test@email.com', id: 'testId' });

      expect(service.findById('testId')).toEqual({ email: 'test@email.com', id: 'testId' });
    });
  });

  describe('createUser', () => {
    it('should create a user and save it to the repository', () => {
      mockCreate.mockReturnValue({ email: 'createdUser@email.com', id: 'createdUserId' });

      service.createUser({ email: 'newUser@email.com', password: 'newUserPassword' });

      expect(mockCreate).toHaveBeenCalledWith({ email: 'newUser@email.com', password: 'newUserPassword' });

      expect(mockSave).toHaveBeenCalledWith({ email: 'createdUser@email.com', id: 'createdUserId' });
    });
  });

  describe('updateUser', () => {
    it.todo('');
  });

  describe('deleteUser', () => {
    it.todo('');
  });
});