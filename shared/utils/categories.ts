import { IconType } from 'react-icons'
import { MdCabin } from 'react-icons/md'

import { TbHome, TbCaravan, TbTent, TbBuildingCottage } from 'react-icons/tb'

import { GiWoodCabin } from 'react-icons/gi'
import { FaCaravan } from 'react-icons/fa6'

type Category = {
  label: CategoryLabel
  icon: IconType
}

export type CategoryLabel =
  | 'cabin'
  | 'tent'
  | 'airstream'
  | 'cottage'
  | 'caravan'
  | 'tiny'
  | 'lodge'

export const categories: Category[] = [
  {
    label: 'cabin',
    icon: MdCabin,
  },
  {
    label: 'airstream',
    icon: FaCaravan,
  },
  {
    label: 'tent',
    icon: TbTent,
  },
  {
    label: 'cottage',
    icon: TbBuildingCottage,
  },
  {
    label: 'caravan',
    icon: TbCaravan,
  },

  {
    label: 'tiny',
    icon: TbHome,
  },
  {
    label: 'lodge',
    icon: GiWoodCabin,
  },
]
