import { InMemoryUploadsRepository } from 'test/repositories/in-memory-uploads-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { UploadPetImageCase } from './upload-pet-img'

let uploadsRepository: InMemoryUploadsRepository
let sut: UploadPetImageCase

describe('Upload Pet Image Use Case', () => {
  beforeEach(() => {
    uploadsRepository = new InMemoryUploadsRepository()
    sut = new UploadPetImageCase(uploadsRepository)
  })

  it('should be able to upload an image', async () => {
    const { upload } = await sut.execute({
      title: 'example-title.png',
      sizeInBytes: 12124,
      storageKey: 'adfagfsgdasda-example-title.png',
      pet_id: 'example-pet-id',
    })

    expect(upload.id).toEqual(expect.any(String))
  })

  it('should be able to upload multiple images', async () => {
    for (let i = 1; i <= 5; i++) {
      await sut.execute({
        title: 'example-title.png',
        sizeInBytes: 12124,
        storageKey: 'adfagfsgdasda-example-title.png',
        pet_id: 'example-pet-id',
      })
    }

    expect(uploadsRepository.items).toHaveLength(5)
  })
})
