export const REVIEW_TAG_OPTIONS = [
  'tough grader',
  'get ready to read',
  'particpation matters',
  'extra credit',
  'group projects',
  'amazing lectures',
  'clear grading crieteria',
  'gives good feedback',
  'insiportaional',
  'lots of homework',
  'hilarous',
  'beware of opop quizzes',
  'caring',
  'respected',
  'lecutre heavy',
  'test heavy',
  'graded by a few things',
  'accessible outside class',
  'online savvy',
] as const

export type ReviewTagOption = (typeof REVIEW_TAG_OPTIONS)[number]

export const REVIEW_TAG_LIMIT = 3

export const TAKE_AGAIN_CHOICES = ['Yes', 'No'] as const
export type TakeAgainChoice = (typeof TAKE_AGAIN_CHOICES)[number]
