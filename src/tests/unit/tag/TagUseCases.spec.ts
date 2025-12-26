import { describe, it, expect, beforeEach } from "vitest"
import { CreateTag } from "#use-cases/tag/CreateTag"
import { ListTags } from "#use-cases/tag/ListTags"
import { UpdateTag } from "#use-cases/tag/UpdateTag"
import { DeleteTag } from "#use-cases/tag/DeleteTag"
import { UpdateFlashcard } from "#use-cases/flashcard/UpdateFlashcard"
import { MockTagRepository } from "#mocks/MockTagRepository"
import { MockFlashcardRepository } from "#mocks/MockFlashcardRepository"
import { Flashcard } from "#entities/Flashcard"

describe("Tag Use Cases", () => {
  let tagRepository: MockTagRepository
  let flashcardRepository: MockFlashcardRepository
  let createTag: CreateTag
  let listTags: ListTags
  let updateTag: UpdateTag
  let deleteTag: DeleteTag
  let updateFlashcard: UpdateFlashcard

  beforeEach(() => {
    tagRepository = new MockTagRepository()
    flashcardRepository = new MockFlashcardRepository()
    createTag = new CreateTag(tagRepository)
    listTags = new ListTags(tagRepository)
    updateTag = new UpdateTag(tagRepository)
    deleteTag = new DeleteTag(tagRepository)
    updateFlashcard = new UpdateFlashcard(flashcardRepository)
  })

  describe("CRUD", () => {
    it("should create a new tag", async () => {
      const dto = { name: "clean-code" }
      const result = await createTag.execute(dto)

      expect(result.id).toBeDefined()
      expect(result.name).toBe(dto.name)
      
      const savedTag = await tagRepository.findByName(dto.name)
      expect(savedTag).toEqual(result)
    })

    it("should not create a duplicate tag and return existing one", async () => {
      const dto = { name: "typescript" }
      const first = await createTag.execute(dto)
      const second = await createTag.execute(dto)

      expect(first.id).toBe(second.id)
      const tags = await tagRepository.findAll()
      expect(tags).toHaveLength(1)
    })

    it("should list all tags", async () => {
      await createTag.execute({ name: "tag1" })
      await createTag.execute({ name: "tag2" })

      const tags = await listTags.execute()
      expect(tags).toHaveLength(2)
    })

    it("should update a tag name", async () => {
      const tag = await createTag.execute({ name: "old-name" })
      const updated = await updateTag.execute({ id: tag.id, name: "new-name" })

      expect(updated.name).toBe("new-name")
      const found = await tagRepository.findById(tag.id)
      expect(found?.name).toBe("new-name")
    })

    it("should delete a tag", async () => {
      const tag = await createTag.execute({ name: "to-delete" })
      await deleteTag.execute(tag.id)

      const found = await tagRepository.findById(tag.id)
      expect(found).toBeNull()
    })
  })

  describe("Associations (via UpdateFlashcard)", () => {
    it("should add a tag to a flashcard", async () => {
      const flashcard = Flashcard.create({
        id: "f1",
        question: "Q",
        answer: "A",
        studentId: "s1",
        createdAt: new Date(),
        updatedAt: new Date(),
        tags: ["initial"],
      })
      await flashcardRepository.save(flashcard)

      await updateFlashcard.execute({
        id: "f1",
        studentId: "s1",
        tags: ["initial", "new-tag"],
      })

      const updated = await flashcardRepository.findById("f1")
      expect(updated?.tags).toContain("new-tag")
      expect(updated?.tags).toContain("initial")
    })

    it("should remove a tag from a flashcard", async () => {
      const flashcard = Flashcard.create({
        id: "f1",
        question: "Q",
        answer: "A",
        studentId: "s1",
        createdAt: new Date(),
        updatedAt: new Date(),
        tags: ["tag1", "tag2"],
      })
      await flashcardRepository.save(flashcard)

      await updateFlashcard.execute({
        id: "f1",
        studentId: "s1",
        tags: ["tag2"],
      })

      const updated = await flashcardRepository.findById("f1")
      expect(updated?.tags).not.toContain("tag1")
      expect(updated?.tags).toContain("tag2")
    })
  })
})
