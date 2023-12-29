import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Tab,
  TabList,
  TabPanels,
  Tabs,
  VStack,
} from '@chakra-ui/react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { useEffect, useState } from 'react'
import { MdChevronRight } from 'react-icons/md'
import { Link, useParams } from 'react-router-dom'

import { OptionTradeDetail } from '../../../../../api/src/dto/option-trade.dto'
import { StockTradeDetail } from '../../../../../api/src/dto/stock-trade.dto'
import { UpdateStrategyRequestDto } from '../../../../../api/src/dto/strategy.dto'
import { getStrategy, updateStrategy } from '../../../api/strategies'
import { optionTradesTableColumns, stockTradesTableColumns } from './columnDefs'
import EditableHeading from './EditableHeading'
import EditableTextArea from './EditableTextArea'
import TradesPanel from './TradesPanel'

const StrategyDetailPage = () => {
  const params = useParams()
  const strategyId = params?.strategyId
  const [name, setName] = useState<string>('')
  const [isNameFieldDirty, setIsNameFieldDirty] = useState<boolean>(false)
  const [description, setDescription] = useState<string | undefined>()
  const [isDescriptionFieldDirty, setIsDescriptionFieldDirty] =
    useState<boolean>(false)
  const [optionTrades, setOptionTrades] = useState<OptionTradeDetail[]>([])
  const [stockTrades, setStockTrades] = useState<StockTradeDetail[]>([])
  const queryClient = useQueryClient()

  const { data } = useQuery({
    queryKey: ['strategies', strategyId],
    queryFn: () => {
      return getStrategy(strategyId!)
    },
  })

  useEffect(() => {
    if (data) {
      setName(data.name)
      setDescription(data.description)
      setOptionTrades(data.optionTrades)
      setStockTrades(data.stockTrades)
    }
  }, [data])

  // Editable heading logic
  const handleNameChange = (newValue: string) => {
    setIsNameFieldDirty(true)
    setName(newValue)
  }

  const nameMutation = useMutation({
    mutationFn: (dto: UpdateStrategyRequestDto) => {
      return updateStrategy(strategyId!, dto)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['strategies', strategyId] })
      setIsNameFieldDirty(false)
    },
  })

  const submitNameChange = async () => {
    if (name !== '' && isNameFieldDirty) {
      nameMutation.mutate({ name })
    }
  }

  // Editable text area logic
  const handleDescriptionChange = (newValue: string) => {
    setIsDescriptionFieldDirty(true)
    setDescription(newValue)
  }

  const descriptionMutation = useMutation({
    mutationFn: (dto: UpdateStrategyRequestDto) => {
      return updateStrategy(strategyId!, dto)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['strategies', strategyId] })
      setIsDescriptionFieldDirty(false)
    },
  })

  const submitDescriptionChange = async () => {
    if (
      description !== '' &&
      description !== undefined &&
      isDescriptionFieldDirty
    ) {
      descriptionMutation.mutate({ description })
    }
  }

  // Tables
  const optionTradesTable = useReactTable({
    data: optionTrades,
    columns: optionTradesTableColumns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  })

  const stockTradesTable = useReactTable({
    data: stockTrades,
    columns: stockTradesTableColumns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  })

  return (
    <>
      {data && (
        <VStack width="100%" alignItems="start">
          <Breadcrumb spacing={2} separator={<MdChevronRight />}>
            <BreadcrumbItem>
              <BreadcrumbLink color="purple.500" as={Link} to="/manage">
                All Strategies
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem isCurrentPage>
              <BreadcrumbLink color="gray.600" href="#">
                Current Strategy
              </BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
          <EditableHeading
            headingText={name}
            handleChange={handleNameChange}
            submitChange={submitNameChange}
          />
          <Box width="100%" mt={1}>
            {description !== undefined && (
              <EditableTextArea
                text={description}
                handleChange={handleDescriptionChange}
                submitChange={submitDescriptionChange}
              />
            )}
          </Box>
          <Box width="100%" mt={8}>
            <Tabs width="100%" colorScheme="purple" variant="soft-rounded">
              <TabList>
                <Tab>Options</Tab>
                <Tab>Stock</Tab>
              </TabList>
              <TabPanels>
                <TradesPanel asset="Options" table={optionTradesTable} />
                <TradesPanel asset="Stocks" table={stockTradesTable} />
              </TabPanels>
            </Tabs>
          </Box>
        </VStack>
      )}
    </>
  )
}

export default StrategyDetailPage
