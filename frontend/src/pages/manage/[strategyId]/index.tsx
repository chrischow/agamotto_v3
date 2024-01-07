import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  HStack,
  Spacer,
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
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table'
import { useEffect, useState } from 'react'
import { MdChevronRight } from 'react-icons/md'
import { Link, useParams } from 'react-router-dom'

import { OptionTradeDetail } from '../../../../../api/src/dto/option-trade.dto'
import { StockTradeDetail } from '../../../../../api/src/dto/stock-trade.dto'
import { UpdateStrategyRequestDto } from '../../../../../api/src/dto/strategy.dto'
import { getStrategy, updateStrategy } from '../../../api/strategies'
import AddLogMenu from './AddLogMenu'
import { optionTradesTableColumns, stockTradesTableColumns } from './columnDefs'
import DeleteStrategyModal from './DeleteStrategyModal'
import EditableHeading from './EditableHeading'
import EditableTextArea from './EditableTextArea'
import TradesPanel from './TradesPanel'

const StrategyDetailPage = () => {
  const params = useParams()
  const strategyId = params?.strategyId as string
  const [name, setName] = useState<string>('')
  const [tabIndex, setTabIndex] = useState(0)
  const [isNameFieldDirty, setIsNameFieldDirty] = useState<boolean>(false)
  const [description, setDescription] = useState<string | undefined>()
  const [isDescriptionFieldDirty, setIsDescriptionFieldDirty] =
    useState<boolean>(false)
  const [optionTrades, setOptionTrades] = useState<OptionTradeDetail[]>([])
  const [stockTrades, setStockTrades] = useState<StockTradeDetail[]>([])
  const queryClient = useQueryClient()

  // Handle tab changes
  const activateOptionsTab = () => setTabIndex(0)
  const activateStocksTab = () => setTabIndex(1)

  // Get strategy data
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
  const [optionSortState, setOptionSortState] = useState<SortingState>([])
  const [stockSortState, setStockSortState] = useState<SortingState>([])
  const optionTradesTable = useReactTable({
    data: optionTrades,
    columns: optionTradesTableColumns,
    state: {
      sorting: optionSortState,
    },
    initialState: {
      pagination: {
        pageSize: 20,
      },
    },
    onSortingChange: setOptionSortState,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  })

  const stockTradesTable = useReactTable({
    data: stockTrades,
    columns: stockTradesTableColumns,
    state: {
      sorting: stockSortState,
    },
    initialState: {
      pagination: {
        pageSize: 20,
      },
    },
    onSortingChange: setStockSortState,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
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
          <HStack width="100%" alignItems="end">
            <EditableHeading
              headingText={name}
              handleChange={handleNameChange}
              submitChange={submitNameChange}
            />
            <Spacer />
            <DeleteStrategyModal strategyId={strategyId} />
          </HStack>
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
            <Tabs
              width="100%"
              colorScheme="purple"
              variant="soft-rounded"
              onChange={(index) => setTabIndex(index)}
              index={tabIndex}
            >
              <HStack>
                <TabList>
                  <Tab>Options</Tab>
                  <Tab>Stocks</Tab>
                </TabList>
                <Spacer />
                {strategyId && (
                  <AddLogMenu
                    strategyId={strategyId}
                    activateOptionsTab={activateOptionsTab}
                    activateStocksTab={activateStocksTab}
                  />
                )}
              </HStack>
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
